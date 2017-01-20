Template.landing.onRendered(function() {
    this.$('.slider').slider({ full_width: true });
    // Pause slider
    $('.slider').slider('pause');
    // Start slider
    $('.slider').slider('start');
    // Next slide
    $('.slider').slider('next');
    // Previous slide
    $('.slider').slider('prev');
});
