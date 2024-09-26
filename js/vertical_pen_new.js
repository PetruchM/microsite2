var totalItems = 25; // Celkový počet článků
var itemsPerPage = 5; // Počet článků na stránku při vybraném filtru
var currentIndex = 0; // Aktuální pozice v carouselu (pro případ bez filtru)
var filterActive = false; // Příznak pro stav, kdy je filtr aktivní
var filteredItems = []; // Pole s indexy článků po vyfiltrování

function updatePagerCarousel(items) {
    const pagerInner = document.querySelector('#pagerCarousel .carousel-inner');
    pagerInner.innerHTML = ''; // Vymažeme stávající obsah

    items.forEach((itemIndex, i) => {
        const item = document.createElement('div');
        item.classList.add('pager-item-flag', 'carousel-item');
        if (i === 0) item.classList.add('active'); // Nastavíme první jako aktivní
        
        const button = document.createElement('button');
        button.classList.add('card');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-target', '#projectCarousel');
        button.setAttribute('data-bs-slide-to', itemIndex);
        button.setAttribute('data-filter-target', itemIndex);

        // Přidání obsahu tlačítka (thumbnail + overlay)
        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');
        const img = document.createElement('img');
        img.setAttribute('src', `images/articles/minis/article_${itemIndex + 1}.png`); // Dynamické načítání obrázků
        img.classList.add('img-fluid');
        cardImg.appendChild(img);

        const overlay = document.createElement('div');
        overlay.classList.add('card-img-overlay');
        overlay.innerText = itemIndex + 1;

        button.appendChild(cardImg);
        button.appendChild(overlay);
        item.appendChild(button);
        pagerInner.appendChild(item);
    });
}

function applyFilter(category) {
    // Vyhledáme články podle zadané kategorie
    filterActive = true;
    filteredItems = getFilteredItems(category); // Funkce, která vrátí pole indexů článků pro danou kategorii
    updatePagerCarousel(filteredItems); // Aktualizujeme pager carousel
}

function clearFilter() {
    // Zrušíme filtr a zobrazíme všech 25 článků
    filterActive = false;
    currentIndex = 0;
    loadItemsForIndex(currentIndex); // Načteme prvních 5 položek
}

function loadItemsForIndex(startIndex) {
    let items = [];
    for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i >= totalItems) break;
        items.push(i);
    }
    updatePagerCarousel(items); // Aktualizujeme pager carousel s načtenými položkami
}

function moveNext() {
    if (filterActive) {
        // Procházení článků
        let projectCarousel = document.querySelector('#projectCarousel');
        let nextButton = projectCarousel.querySelector('.carousel-control-next');
        nextButton.click(); // Simulujeme kliknutí na tlačítko pro přechod na další článek
    } else {
        // Procházení thumbnails
        currentIndex = (currentIndex + itemsPerPage) % totalItems;
        loadItemsForIndex(currentIndex);
    }
}

function movePrev() {
    if (filterActive) {
        // Procházení článků
        let projectCarousel = document.querySelector('#projectCarousel');
        let prevButton = projectCarousel.querySelector('.carousel-control-prev');
        prevButton.click(); // Simulujeme kliknutí na tlačítko pro přechod na předchozí článek
    } else {
        // Procházení thumbnails
        currentIndex = (currentIndex - itemsPerPage + totalItems) % totalItems;
        loadItemsForIndex(currentIndex);
    }
}

document.querySelector('.carousel-control-next').addEventListener('click', moveNext);
document.querySelector('.carousel-control-prev').addEventListener('click', movePrev);
