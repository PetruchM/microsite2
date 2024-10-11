let pagerCarouselTemplate = document.getElementById('pagerCarousel')

var pagerCopy = null;

// var pagerCopy = pagerCarouselTemplate.cloneNode(true);
// pagerCopy.setAttribute('id', 'pagerCarouselCopy');
// pagerCopy.classList.add(copyNum.toString());

generatePagerCarouselPlain();

var copyNum = 0;


function generatePagerCarousel(category) 
{
    console.log("Generating pager carousel with category: " + category)

    // Remove pagerCopy if it already exists in the HTML
    if (pagerCopy) {
        pagerCopy.remove();
    }

    pagerCopy = pagerCarouselTemplate.cloneNode(true);
    pagerCopy.setAttribute('id', 'pagerCarouselCopy');
    pagerCopy.classList.remove('d-none');
    copyNum += 1;
    pagerCopy.classList.add(copyNum.toString());

    // Append pagerCopy right after pagerCarouselTemplate in the body
    pagerCarouselTemplate.insertAdjacentElement('afterend', pagerCopy);

    if (category != 'all') 
    {
        // find all items with class item-flag
        var fresh_items = pagerCopy.querySelectorAll('.pager-item-flag');

        // does active slide have the category?
        var active = pagerCopy.querySelector('.carousel-item.active');
        var activeHasCategory = active.classList.contains(category);

        // loop through each item
        for (var i = 0; i < fresh_items.length; i++) {
            // if the item doesn't have the category as a class, add the class hidden
            if (!fresh_items[i].classList.contains(category)) {
                fresh_items[i].children[0].classList.add('d-none');
                if (!activeHasCategory) {
                    fresh_items[i].classList.remove('active');
                }
                fresh_items[i].classList.remove('carousel-item');
            }
            else {
                fresh_items[i].children[0].classList.remove('d-none');
                fresh_items[i].classList.add('carousel-item');
            }
        }
        // add active to the first item with class carousel-item
        if (!activeHasCategory) {
            console.log("manualy setting active")
            var active = pagerCopy.querySelector('.carousel-item');
            active.classList.add('active');
        }
    }

    synchronizePagerWithProjectCarousel();
    
    // CLONING SLIDES

    var generated_items = pagerCopy.querySelectorAll('.carousel-item');

    for (var i=0; i<generated_items.length; i++) {
        el = generated_items[i]

        if (el.children[0].classList.contains('d-none')) {
            el.remove();
        }

        const minPerSlide = 5
        var next = el.nextElementSibling
        while (next && !next.classList.contains('carousel-item')) {
            next = next.nextElementSibling;
        }

        var spawnedCounter = 0;
        var spawnedEnough = false;
        while (!spawnedEnough) {
            if (!next) {
                // wrap carousel by using first child
                next = generated_items[0]
            }
            let cloneChild = next.cloneNode(true)

            if (cloneChild.children[0].classList.contains('d-none')) {
                next = next.nextElementSibling
                continue;
            }

            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
            spawnedCounter += 1;
            if (spawnedCounter >= minPerSlide - 1) {
                spawnedEnough = true;
            }
        }
    }

    synchronizePagerWithProjectCarousel();
}

function generatePagerCarouselPlain() 
{
    console.log("Generating plain pager carousel")

    generatePagerCarousel('all'); 
}

function synchronizePagerWithProjectCarousel() {
    // Get all pager carousel items
    const pagerItems = pagerCopy.querySelectorAll('.card');

    for (var i=0; i<pagerItems.length; i++) {
        pagerItem = pagerItems[i];
        if (pagerItem.classList.contains('d-none')) {
            continue;
        }
        // Get data-filter-target value from pager item
        const filterTarget = parseInt(pagerItem.dataset.filterTarget);
        // console.log(filterTarget);

        // Find matching project carousel item
        const projectCarouselItem = projectCarousel.querySelector(`.carousel-item[data-filter-index="${filterTarget}"]`);

        if (projectCarouselItem) {
            // Get the index of the matched project carousel item among displayed slides
            const displayedSlides = projectCarousel.querySelectorAll('.carousel-item');
            let slideIndex = -1;
            displayedSlides.forEach((slide, index) => {
                if (slide === projectCarouselItem) {
                    slideIndex = index;
                }
            });

            // Set data-bs-slide-to attribute of pager item
            if (slideIndex !== -1) {
                pagerItem.setAttribute('data-bs-slide-to', slideIndex);
                // console.log("Setting slide index to " + slideIndex);
            }
        }
    }
}



// Function to execute on screen click
window.addEventListener('click', function() {
    // Step 1: Find the active div inside projectCarousel
    var activeElement = document.querySelector('#projectCarousel .active');
    
    // Step 2: Get the value of the data-filter-index attribute
    if (activeElement) {
        var activeIndex = activeElement.getAttribute('data-filter-index');

        // Step 3: Iterate over all buttons in pagerCarouselCopy
        var buttons = document.querySelectorAll('#pagerCarouselCopy button');

        buttons.forEach(function(button) {
            // Step 4: Check if the button's data-filter-target matches the activeIndex
            var filterTarget = button.getAttribute('data-filter-target');

            if (filterTarget === activeIndex) {
                // Add class "a-active-card" if they match
                button.classList.add('a-active-card');
            } else {
                // Remove class "a-active-card" if they don't match
                button.classList.remove('a-active-card');
            }
        });
    }
});
