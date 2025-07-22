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
        direction: 'ltr',
        height: null,
        width: '85vw',
        }
    }
    });

    // splide.on('mounted', () => {
    //     setTimeout(() => {
    //         splide.go('-2');
    //     }, 200);
    //     setTimeout(() => {
    //         splide.refresh();
    //         highlightMiddleSlide();
    //     }, 400);
    // });
    // setupSplideEvents();
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
                activateDesiredPagerSlide(filterIndex);
        });
        splide.mount();
    }

    //#########tohle funguje popuze pro žádný filtr
    // Klikání na obrázky
    // document.querySelector('#pager-carousel').addEventListener('click', (event) => {
    //     const img = event.target.closest('.pager-carousel-image');

    //     if (img) {
    //         PagerCardClicked(splide.index, img.dataset.id);
    //     }
    // });

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
        //There was a problem with the pager carousel not updating correctly, when filtered on mobile phones, the splide is rebuild but as a horizontal one.
        //That coused problems with the function splide.go() which caused that the slides were not visible so we need to wait like this
        setTimeout(() => {
            splide.go('-2');
        }, 200);
        setTimeout(() => {
            splide.refresh();
            highlightMiddleSlide();
        }, 400);
    }