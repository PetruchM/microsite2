// Create a new Hammer instance for the carousel
var hammer = new Hammer(projectCarousel);

// Listen for swipeleft and swiperight events
hammer.on('swipeleft', function() {
  // Trigger the next slide event
  $(projectCarousel).carousel('next');
});

hammer.on('swiperight', function() {
  // Trigger the previous slide event
  $(projectCarousel).carousel('prev');
});
