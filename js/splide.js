const splide = new Splide('#pager-carousel', {
      type: 'loop',
      direction: 'ttb', 
      height: '60vh',
      perPage: 5,
      perMove: 1,
      wheel: false,
      pagination: false,
      breakpoints: {
        1023: {
        direction: 'ltr',  // na mobilech: horizontálně
        height: null,      // výška se neomezuje
        width: '85vw',
        }
    }
    });

    // Klikání na obrázky
    document.querySelectorAll('.pager-carousel-image').forEach(img => {
      img.addEventListener('click', () => {
        alert("Klikl jsi na obrázek " + img.dataset.id);
        // nebo přesměrování: window.location.href = `detail.html?id=${img.dataset.id}`;
      });
    });

    function highlightMiddleSlide() {
        const perPage = splide.options.perPage;
        const currentIndex = splide.index;
        const middleOffset = Math.floor(perPage / 2);
        const targetIndex = currentIndex + middleOffset;

        // First, remove 'highlighted' from all actual DOM slide elements
        document.querySelectorAll('.splide__slide').forEach(slide => {
            slide.classList.remove('highlighted');
        });

        // Use Splide's internal Slides component to get the DOM element at that index
        const SlideObject = splide.Components.Slides.getAt(targetIndex);

        if (SlideObject && SlideObject.slide) {
            SlideObject.slide.classList.add('highlighted');
            console.log("Highlighting DOM slide at index", targetIndex);
        } else {
            console.warn("No slide found at index", targetIndex);
        }
    }

    splide.on('mounted move', highlightMiddleSlide);

    splide.mount();