var $window = $(window),
    $body = $("body");

$window.on("load", function () {
  $body.removeClass("is-loading");
});

$('[data-fancybox]').fancybox({
  protect: true,
  loop: true
});