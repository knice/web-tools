$(document).ready(function() {
  var Resize = new function() {

    var $uploadCrop, $uploadedImage;

    this.readFile = function(input) {
      if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          $uploadedImage = new Image();
          $uploadedImage.src = e.target.result;

          $uploadedImage.onload = function() {
            Resize.originalWidth = Resize.imageWidth  = this.width;
            Resize.originalHeight = Resize.imageHeight = this.height;

            var ratio = (this.height * 1.0) / this.width

            if($uploadCrop) $uploadCrop.destroy();

            Resize.viewPortWidth = $('.upload-msg').width();
            Resize.viewPortHeight = ratio * parseInt(Resize.viewPortWidth, 10);

            $uploadCrop = Resize.newCroppie();

            $('.upload-croppie').addClass('ready');
            $("#resize-select").prop('disabled', false);
            $(".upload-result").prop('disabled', false);
            $(".submit-btn").prop('disabled', false);
            $("#user-width").prop('disabled', false).prop('max', Resize.originalWidth);
            $("#user-height").prop('disabled', false).prop('max', Resize.originalHeight);
          }
        }

        reader.readAsDataURL(input.files[0]);
      } else {
        alert("Sorry - you're browser doesn't support the FileReader API");
      }
    }

    this.showResult = function(input) {
      $uploadCrop.result({
        type: 'canvas', 
        size: 'viewport'
      }).then(function(img) {
        Resize.popupResult({
          src: img
        })
      });
    }

    this.newCroppie = function() {
      var croppie = new Croppie(document.getElementById('upload-croppie'), {
        viewport: {
          width: Resize.viewPortWidth,
          height: Resize.viewPortHeight
        },
        boundary: {
          width: parseInt(Resize.viewPortWidth, 10) + 100,
          height: parseInt(Resize.viewPortHeight, 10) + 100
        }
      });
      croppie.bind({
        url: $uploadedImage.src
      });
      return croppie;
    }

    this.fillDimensionFields = function(self) {
      var data = $('#resize-select').find(':selected').data('dimensions');
      $("#user-width").val(data.width);
      $("#user-height").val(data.height);
      Resize.resizeCroppie();
    }

    this.resizeCroppie = function() {
      if ($("#user-width").val()) Resize.viewPortWidth  = parseInt($("#user-width").val());
      if ($("#user-height").val()) Resize.viewPortHeight = parseInt($("#user-height").val());

      if($uploadCrop) $uploadCrop.destroy();
      $uploadCrop = Resize.newCroppie();
    }

    this.popupResult = function(result) {
      var html;
      if (result.html) {
        html = result.html;
      }
      if (result.src) {
        html = '<img src="' + result.src + '" />';
      }
      swal({
        title: 'Your Cropped Image Preview',
        html: true,
        text: html,
        allowOutsideClick: true
      });
    }
  }

  $(document).on('change', '#dimension_image_upload', function() { Resize.readFile(this); });
  $(document).on('change', '#resize-select', function() { Resize.fillDimensionFields(this); })
  $(document).on('change', '#user-width, #user-height', function() { 
    Resize.resizeCroppie();
    $("#resize-select").val($("#resize-select option:first").val());
  })

  $(document).on('click', '.upload-result', function(event) { 
    Resize.showResult();
    event.preventDefault();
  });
});