$(document).ready(function() {
  var Resize = new function() {

    var $uploadCrop;

    this.readFile = function(input) {
      if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          var image = new Image();
          image.src = e.target.result;

          image.onload = function() {
            Resize.originalWidth = Resize.imageWidth  = this.width;
            Resize.originalHeight = Resize.imageHeight = this.height;
            $(".sample-resolution").text(Resize.imageWidth + " x " + Resize.imageHeight);

            var ratio = (this.height * 1.0) / this.width

            if($uploadCrop) $uploadCrop.destroy();
            $uploadCrop = Resize.newCroppie(e, ratio);
            $('.upload-croppie').addClass('ready');
          }
        }

        reader.readAsDataURL(input.files[0]);

        $("#resize-select").prop('disabled', false);
        $(".upload-result").prop('disabled', false);
        $(".submit-btn").prop('disabled', false);

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

    this.newCroppie = function(e, ratio) {
      this.viewWidth = $('.upload-msg').width();
      this.viewHeight = ratio * parseInt(this.viewWidth, 10);

      var croppie = new Croppie(document.getElementById('upload-croppie'), {
        viewport: {
          width: this.viewWidth,
          height: this.viewHeight
        },
        boundary: {
          width: parseInt(this.viewWidth, 10) + 100,
          height: parseInt(this.viewHeight, 10) + 100
        }
      });
      croppie.bind({
        url: e.target.result
      });

      return croppie;
    }

    this.popupResult = function(result) {
      console.log(this.viewWidth);
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

    this.calculateResolution = function(result) {
      switch(parseInt(result.value, 10)) {
        case 25:
          Resize.newResolution(this, 1);
          break;
        case 50:
          Resize.newResolution(this, 2);
          break;
        case 75:
          Resize.newResolution(this, 3);
          break;
        default:
          Resize.newResolution(this, 4);
      }
    }

    this.newResolution = function(self, val) {
      Resize.imageWidth  = (self.originalWidth * val) / 4;
      Resize.imageHeight = (self.originalHeight * val) / 4;
      $(".sample-resolution").text(Resize.imageWidth + " x " + Resize.imageHeight);
    }
  }

  $(document).on('change', '#dimension_image_upload', function() { Resize.readFile(this); });

  $(document).on('change', '#resize-select', function() { Resize.calculateResolution(this); });

  $(document).on('click', '.upload-result', function(event) { 
    Resize.showResult();
    event.preventDefault();
  });
});