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
        width: '75vw',
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
        const slides = splide.Components.Elements.slides;
        const perPage = splide.options.perPage;
        const currentIndex = splide.index;
        const total = slides.length;

        // Clear all highlights
        slides.forEach(slide => {
            slide.classList.remove('highlighted');
        });

        // Find the middle visible slide index
        const middleOffset = Math.floor(perPage / 2);
        const middleIndex = (currentIndex + middleOffset) % total;

        slides[middleIndex].classList.add('highlighted');

        // console.log("Slides:", splide.Components.Elements.slides);
        // console.log("Index:", splide.index);

        }

    splide.on('mounted move', highlightMiddleSlide);

    splide.mount();