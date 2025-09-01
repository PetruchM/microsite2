const splide = new Splide('#pager-carousel', {
      type: 'loop',
      speed:500,
      direction: 'ttb', 
      height: '60vh',
      perPage: 5,
      perMove: 1,
      wheel: false,
      drag: false, //fragging mause or sliding temporarily disabled
      pagination: false,
      waitForTransition: true,
      breakpoints: {
        800: {
        direction: 'ltr',
        height: null,
        width: '85vw',
        }
    }
    });
    splide.mount();

    function splideFirstSetup(){
        const allFilterIndex = 5;
        updatePagerCarousel(allFilterIndex)
    }
    
    function setupSplideEvents() {
        splide.on('mounted move', highlightMiddleSlide);
    }

    function updatePagerCarousel(filterIndex) {
        splide.destroy(true);

        if (filterIndex === CONFIG.ALL_FILTER_INDEX) {
            splide.options = {start: 23};
        } else {
            splide.options = {start: 3};
        }

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
        splide.on('mounted', () => {
                setupSplideEvents();
                highlightMiddleSlide();
        });
        splide.mount();
        setTimeout(() => { splide.refresh(); }, 500);  // Refresh after a short delay to ensure proper layout after the start slide change
    }

    // Klikání na obrázky
    document.querySelector('#pager-carousel').addEventListener('click', (event) => {
        const img = event.target.closest('.pager-carousel-image');

        if (img) {
            PagerCardClicked(img.dataset.id);
        }
    });

    function GetCurrentPagerSlideIndex(){
        const slides = document.querySelectorAll('.splide__slide.is-visible');
        const img = slides[2].querySelector('img');
        return img.dataset.id;
    }

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