// Create a new Hammer instance for the carousel
var hammer = new Hammer(projectCarousel);

// Listen for swipeleft and swiperight events
hammer.on('swipeleft', function(ev) {
  ev.preventDefault();
  // Trigger the next slide event
  // $(projectCarousel).carousel('next');
  CarouselButtonClicked(1);
});

hammer.on('swiperight', function(ev) {
  ev.preventDefault();
  // Trigger the previous slide event
  // $(projectCarousel).carousel('prev');
  CarouselButtonClicked(-1);
});
