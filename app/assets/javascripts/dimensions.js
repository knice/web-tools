// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var Resize = new function() {

  var $uploadCrop;
  this.viewWidth = document.getElementById('dimension_image_width');
  this.viewHeight = document.getElementById('dimension_image_width');

  this.newCroppie = function(e) {
    var croppie = new Croppie(document.getElementById('upload-demo'), {
      viewport: {
        width: 200,
        height: 200
      },
      boundary: {
        width: 300,
        height: 300
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
        $uploadCrop = Resize.newCroppie(e);
        $('.upload-demo').addClass('ready');
      }

      reader.readAsDataURL(input.files[0]);
    } else {
      alert("Sorry - you're browser doesn't support the FileReader API");
    }
  }
}

$(document).on('change', '#dimension_image_upload', function () { Resize.readFile(this); });

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