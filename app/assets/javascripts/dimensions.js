// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  var Resize = new function() {

    var $uploadCrop;

    this.newCroppie = function(e, ratio) {
      // FIX THE WIDTH WITH YOUR CSS MEDIA QUERIES AND TAKE OFF FLOAT LEFT ON THE COLUMNS FOR MOBILE
      this.viewWidth = $('.upload-msg').width();
      this.viewHeight = ratio * parseInt(this.viewWidth, 10);
      console.log(this.viewWidth);
      console.log(this.viewHeight);

      var croppie = new Croppie(document.getElementById('upload-demo'), {
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

    this.readFile = function(input) {
      if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          var image = new Image();
          image.src = e.target.result;

          image.onload = function() {
            console.log(this.width);
            console.log(this.height);

            var ratio = (this.height * 1.0) / this.width

            $uploadCrop = Resize.newCroppie(e, ratio);
            $('.upload-demo').addClass('ready');  
          }
        }

        reader.readAsDataURL(input.files[0]);
      } else {
        alert("Sorry - you're browser doesn't support the FileReader API");
      }
    }
  }

  $(document).on('change', '#dimension_image_upload', function () { Resize.readFile(this); });
});
// function popupResult(result) {
//   var html;
//   if (result.html) {
//     html = result.html;
//   }
//   if (result.src) {
//     html = '<img src="' + result.src + '" />';
//   }
//   swal({
//     title: '',
//     html: true,
//     text: html,
//     allowOutsideClick: true
//   });
//   setTimeout(function(){
//     $('.sweet-alert').css('margin', function() {
//       var top = -1 * ($(this).height() / 2),
//         left = -1 * ($(this).width() / 2);

//       return top + 'px 0 0 ' + left + 'px';
//     });
//   }, 1);
// }

// $(document).on('click', '.upload-result', function (ev) {
//   $uploadCrop.croppie('result', {
//     type: 'canvas',
//     size: 'original'
//   }).then(function (resp) {
//     popupResult({
//       src: resp
//     });
//   });
// });