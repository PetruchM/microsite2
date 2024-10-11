let pagerCarouselTemplate = document.getElementById('pagerCarousel')
var pagerCopy = null;
var copyNum = 0;

generatePagerCarouselPlain();

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



// var totalItems = 25; // Celkový počet článků
// var itemsPerPage = 5; // Počet článků na stránku při vybraném filtru
// var currentIndex = 0; // Aktuální pozice v carouselu (pro případ bez filtru)
// var filterActive = false; // Příznak pro stav, kdy je filtr aktivní
// var filteredItems = []; // Pole s indexy článků po vyfiltrování

// function updatePagerCarousel(items) {
//     const pagerInner = document.querySelector('#pagerCarousel .carousel-inner');
//     pagerInner.innerHTML = ''; // Vymažeme stávající obsah

//     items.forEach((itemIndex, i) => {
//         const item = document.createElement('div');
//         item.classList.add('pager-item-flag', 'carousel-item');
//         if (i === 0) item.classList.add('active'); // Nastavíme první jako aktivní
        
//         const button = document.createElement('button');
//         button.classList.add('card');
//         button.setAttribute('type', 'button');
//         button.setAttribute('data-bs-target', '#projectCarousel');
//         button.setAttribute('data-bs-slide-to', itemIndex);
//         button.setAttribute('data-filter-target', itemIndex);

//         // Přidání obsahu tlačítka (thumbnail + overlay)
//         const cardImg = document.createElement('div');
//         cardImg.classList.add('card-img');
//         const img = document.createElement('img');
//         img.setAttribute('src', `images/articles/minis/article_${itemIndex + 1}.png`); // Dynamické načítání obrázků
//         img.classList.add('img-fluid');
//         cardImg.appendChild(img);

//         const overlay = document.createElement('div');
//         overlay.classList.add('card-img-overlay');
//         overlay.innerText = itemIndex + 1;

//         button.appendChild(cardImg);
//         button.appendChild(overlay);
//         item.appendChild(button);
//         pagerInner.appendChild(item);
//     });
// }

// function applyFilter(category) {
//     // Vyhledáme články podle zadané kategorie
//     filterActive = true;
//     filteredItems = getFilteredItems(category); // Funkce, která vrátí pole indexů článků pro danou kategorii
//     updatePagerCarousel(filteredItems); // Aktualizujeme pager carousel
// }

// function clearFilter() {
//     // Zrušíme filtr a zobrazíme všech 25 článků
//     filterActive = false;
//     currentIndex = 0;
//     loadItemsForIndex(currentIndex); // Načteme prvních 5 položek
// }

// function loadItemsForIndex(startIndex) {
//     let items = [];
//     for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
//         if (i >= totalItems) break;
//         items.push(i);
//     }
//     updatePagerCarousel(items); // Aktualizujeme pager carousel s načtenými položkami
// }

// function moveNext() {
//     if (filterActive) {
//         // Procházení článků
//         let projectCarousel = document.querySelector('#projectCarousel');
//         let nextButton = projectCarousel.querySelector('.carousel-control-next');
//         nextButton.click(); // Simulujeme kliknutí na tlačítko pro přechod na další článek
//     } else {
//         // Procházení thumbnails
//         currentIndex = (currentIndex + itemsPerPage) % totalItems;
//         loadItemsForIndex(currentIndex);
//     }
// }

// function movePrev() {
//     if (filterActive) {
//         // Procházení článků
//         let projectCarousel = document.querySelector('#projectCarousel');
//         let prevButton = projectCarousel.querySelector('.carousel-control-prev');
//         prevButton.click(); // Simulujeme kliknutí na tlačítko pro přechod na předchozí článek
//     } else {
//         // Procházení thumbnails
//         currentIndex = (currentIndex - itemsPerPage + totalItems) % totalItems;
//         loadItemsForIndex(currentIndex);
//     }
// }

// document.querySelector('.carousel-control-next').addEventListener('click', moveNext);
// document.querySelector('.carousel-control-prev').addEventListener('click', movePrev);
