var	$window = $(window),
    $body = $('body');

$body.addClass('is-loading');

lightbox.option({
    "wrapAround": true,
    "fadeDuration": 450,
    "imageFadeDuration": 300,
    "resizeDuration": 450
});

$window.on('load', function() {
    $body.removeClass('is-loading');
}); 