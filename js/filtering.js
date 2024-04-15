const projectCarousel = document.getElementById('projectCarousel')

const pcFilterContainer = document.querySelector('.carousel__filter-container');
const pcFilterButtons = Array.from(pcFilterContainer.children);
// add listeners to all filter buttons
pcFilterButtons.forEach((button, index) => {
    button.addEventListener('click', e => {
        setFilter(button, index);
    })
})

const filterLabel = document.querySelector('.carousel__filter-label');

// pager carousel
const pagerCarousel = document.getElementById('pagerCarousel');


// --------------------NEW CODE------------------

var currentCategory = 'all';

// hack to enable scrolling on phone
// setTimeout(function() {
//     filterCarousel('tech');
//     filterCarousel('all');
// }, 100);

function filterCarousel(category) {
    if (category == currentCategory) {
        category = 'all';
    }
    if (category == 'all') {
        console.log("showing all slides")
        showAllSlides();
        currentCategory = 'all';
        generatePagerCarouselPlain();
        return;
    }

    showAllSlides();
    currentCategory = category; 
    console.log("Filtering with: " + currentCategory);


    // Find the first item with the specified category
    var firstGoodSlide = document.querySelector('.item-flag.' + category);
    // If an item is found, get its index
    var index = Array.from(firstGoodSlide.parentElement.children).indexOf(firstGoodSlide);
    $('#projectCarousel').carousel(index);

    // MAIN CAROUSEL
    setTimeout(function() {
        // find all items with class item-flag
        var items = document.querySelectorAll('.item-flag');

        // does active slide have the category?
        var active = projectCarousel.querySelector('.carousel-item.active');
        var activeHasCategory = active.classList.contains(category);

        // loop through each item
        for (var i = 0; i < items.length; i++) {
            // if the item doesn't have the category as a class, add the class hidden
            if (!items[i].classList.contains(category)) {
                items[i].classList.add('d-none');
                if (!activeHasCategory) {
                    items[i].classList.remove('active');
                }
                items[i].classList.remove('carousel-item');
            }
            else {
                items[i].classList.remove('d-none');
                items[i].classList.add('carousel-item');
            }
        }
        // add active to the first item with class carousel-item
        if (!activeHasCategory) {
            console.log("manualy setting active")
            var active = document.querySelector('.carousel-item');
            active.classList.add('active');
        }

        generatePagerCarousel(category);
    }
    , 600);
}

function showAllSlides() {
    var items = document.querySelectorAll('.item-flag');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('d-none');
        items[i].classList.add('carousel-item');
    }
    // var pager_items = document.querySelectorAll('.pager-item-flag');
    // for (var i = 0; i < pager_items.length; i++) {
    //     pager_items[i].classList.remove('d-none');
    //     pager_items[i].classList.add('pager-item-flag');
    // }
}

// -------- SELECTING A NEW FILTER (OLD CODE) --------

function classToName(filterClass) {
    switch (filterClass) {
        case 'tech':
            return 'TECHNICKÉ VĚDY';
        case 'unnat':
            return 'VĚDY O NEŽIVÉ PŘÍRODĚ';
        case 'bio':
            return 'LÉKAŘSKÉ A BIOLOGICKÉ VĚDY';
        case 'socio':
            return 'SPOLEČENSKÉ A HUMANITNÍ VĚDY';
        case 'env':
            return 'ZEMĚDĚLSKÉ A BIOLOGICKO-<br>ENVIROMENTÁLNÍ VĚDY';
    }
}

function activateFilterLabel(filterClass) {
    filterLabel.innerHTML = classToName(filterClass);
    filterLabel.classList.add('label-active');
}

const deactivateFitlerLabel = () => {
    filterLabel.classList.remove('label-active');    
}

var filterTimeout;
// sets a new filter and loads the first slide in that category
function setFilter(button, index) {
    console.log('filter button ' + index + ' clicked');
    // if we are activating an inactive filter
    if (!button.classList.contains('active-filter')) {
        // disable the previous active filter
        var activeFilters = document.querySelectorAll('.active-filter');
        // console.log("active filters:", activeFilters)
        activeFilters.forEach(element => {
            element.classList.remove('active-filter');
        });
        
        // activate the new filter
        pcFilterButtons[index].classList.add('active-filter');
        var filterClass = "";
        // select filter based on which button was clicked
        switch (index) {
            case 0:
                filterClass = 'tech';
                break;
            case 1:
                filterClass = 'unnat';
                break;
            case 2:
                filterClass = 'bio';
                break;
            case 3:
                filterClass = 'socio';
                break;
            case 4:
                filterClass = 'env';
                break;
        }
        console.log('filterClass is: ' + filterClass);
        activateFilterLabel(filterClass);
        // Set a new timeout
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(function () { deactivateFitlerLabel(); }, 3000);
        console.log("Current filter is:", filterClass);
        filterCarousel(filterClass);
    } 
    // disabeling an active filter
    else {
        // disable the previous active filter
        clearTimeout(filterTimeout);
        deactivateFitlerLabel();
        var activeFilters = document.querySelectorAll('.active-filter');
        activeFilters.forEach(element => {
            element.classList.remove('active-filter');
        });
        filterCarousel('all');
    }
}
