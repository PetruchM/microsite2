const base = {
    type: 'loop',
    speed: 700,
    wheel: false,
    drag: false,
    pagination: false,
    waitForTransition: true,
  };

  const vertical = { direction: 'ttb', height: '60vh', width: null, perPage: 5, perMove: 1 };
  const horizontal = { direction: 'ltr', height: null, width: '85vw', perPage: 5, perMove: 1 };

  const isWideAspect = window.matchMedia('(max-aspect-ratio: 7/5)').matches;
  const isNarrowWidth = window.matchMedia('(max-width: 800px)').matches;

  const mode = (isWideAspect || isNarrowWidth) ? horizontal : vertical;

  const splide = new Splide('#pager-carousel', { ...base, ...mode }).mount();

    function splideFirstSetup(){
        const allFilterIndex = 5;
        updatePagerCarousel(allFilterIndex)
        setTimeout(() => { splide.refresh(); }, 500);
    }

    let timeoutId; // pro zpožděné spuštění checkingSynchro
    function setupSplideEvents() {
        splide.on('move', () => {
            setTimeout(highlightMiddleSlide, 100);
            clearTimeout(timeoutId); // zruší předchozí časovač
            timeoutId = setTimeout(checkingSynchro, 1500); // nastaví nový
        });
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
        splide.mount();
        setupSplideEvents();
        setTimeout(() => { 
            splide.refresh(); 
            console.log("refresh"); 
            highlightMiddleSlide();
        }, 500);  // Refresh after a short delay to ensure proper layout after the start slide change
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
        } else {
            console.warn("No slide found at index", targetIndex);
        }
    }