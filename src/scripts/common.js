var $window = $(window),
    $body = $("body");

$window.on("load", function () {
  $body.removeClass("is-loading");
});

lightbox.option({
  wrapAround: true,
  fadeDuration: 450,
  imageFadeDuration: 300,
  resizeDuration: 450,
  showImageNumberLabel: false,
  fitImageInViewPort: true,
});
