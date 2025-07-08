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

    splide.on('mounted', () => {
        splide.go(23);
    });
    setupSplideEvents();
    splide.mount();
    
    function setupSplideEvents() {
        splide.on('mounted move', highlightMiddleSlide);
    }

    function updatePagerCarousel(filterIndex) {
        splide.destroy(true);

        pagerItems.forEach((item) => {
            const img = item.querySelector('img');
            const dataID = parseInt(img.dataset.id, 10);
            const belongsToFilter = (filterIndex === CONFIG.ALL_FILTER_INDEX) ||
                                    (dataID % CONFIG.ARTICLES_PER_FILTER === filterIndex);

            if (belongsToFilter) {
                item.classList.add('splide__slide');
                item.classList.remove('slide_hidden');
            } else {
                item.classList.remove('splide__slide');
                item.classList.add('slide_hidden');
            }
        });

        splide.mount();
        highlightMiddleSlide();
        setupSplideEvents();
    }


    // Klikání na obrázky
    document.querySelectorAll('.pager-carousel-image').forEach(img => {
      img.addEventListener('click', () => {
        alert("Klikl jsi na obrázek " + img.dataset.id);
        // nebo přesměrování: window.location.href = `detail.html?id=${img.dataset.id}`;
      });
    });

    function highlightMiddleSlide() {
        console.log("Highlighting middle slide");
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

    function activateDesiredPagerSlide(filterIndex) {
        //If the filter is set to ALL, we want to show the first slide index 23, because we want the first slide to be in the middele so last two slides are before.
        //But if a filter is applied, we want to show the third slide (index 3, before we alsa want the first to be in the middle) . 
        const activePagerSlideIdx = (filterIndex === CONFIG.ALL_FILTER_INDEX) ? CONFIG.TOTAL_ARTICLES-2 : CONFIG.ARTICLES_PER_FILTER -2;
        splide.go(activePagerSlideIdx);
        highlightMiddleSlide();
    }