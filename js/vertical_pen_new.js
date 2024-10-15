let pagerCarouselTemplate = document.getElementById('pagerCarousel');
let pagerCarouselItems = pagerCarouselTemplate.querySelectorAll('.carousel-item');
const minisPerSlide=5;
const minisWhenUnfiltered=9;
currentCategory=5;
let allSlidesHere=true;
let currentMini=0;


async function updatePagerCarousel(category, currentSlide){
    console.log(category);
    currentMini=currentSlide;
    let articlesPaths = await getDesiredPaths(category, false,0);

    console.log("Updating pager carousel");

    if (category!=5){ //if filtering to one of the chapters
        //we need to change the images and overlay number
        pagerCarouselItems.forEach(carouselItem => {
            const buttons= carouselItem.querySelectorAll('button');
            buttons.forEach(bttnEl => {
                const numSlide = parseInt(bttnEl.dataset.bsSlideTo, 10);
                bttnEl.querySelector('img').src = articlesPaths[numSlide];
                const cardNum = numSlide + 1;
                bttnEl.querySelector('.card-img-overlay').innerText = cardNum.toString();
            });
        });
        allSlidesHere=false;
    }else{
        for (let i = 0; i < minisPerSlide; i++) {
            const carouselItem = pagerCarouselItems[((i-2)+minisPerSlide)%minisPerSlide];  //why this? because i want the data-bs-slide-to indexes work acording tot the articles
            const buttons= carouselItem.querySelectorAll('button');
            for (let j = 0; j < minisPerSlide; j++) {
                const bttnEl = buttons[j];
                const numslide=(((currentMini-4+i+j)+numOfArticles)%numOfArticles)+1;
                bttnEl.querySelector('img').src = articlesPaths[i+j];
                bttnEl.querySelector('.card-img-overlay').innerText = numslide.toString();
            }
        }
        allSlidesHere=true;
    }
    console.log("full carousel chaged")
}

async function getDesiredPaths(category, updating){
    let articles = [];
    let paths = [];
    if (category != 5) {
        for (let i = 0; i < minisPerSlide; i++) {
            articles.push(i * 5 + category);
        }
    } else if (updating!=0){
        if (updating==1){
            for (let i = 0; i < minisPerSlide; i++) {
                articles.push(((currentMini + i) + numOfArticles) % numOfArticles);
            }
        }else{
            for (let i = 0; i < minisPerSlide; i++) {
                articles.push(((currentMini - 4 + i) + numOfArticles) % numOfArticles);
            }
        }
        
    }else{
        for (let i = 0; i < minisWhenUnfiltered; i++) {
            articles.push(((currentMini - 4 + i) + numOfArticles) % numOfArticles);
        }
    }
    console.log("Fetching article data...");
    console.log(`${articles}`)
    try {
        const response = await fetch('articles.json');  // Load the articles source file asynchronously
        const data = await response.json();

        for (let k = 0; k < articles.length; k++) {
            const id = articles[k];
            const article = data.find(article => article.id === id);  // Load the article based on ID

            if (article) {
                console.log(`Article for ID ${id}:`, article);
                paths.push(article.minis_img);  // Set the image path for the slide
            } else {
                console.log(`No article found for ID ${id}`);
            }
        }

    } catch (error) {
        console.error('Error fetching JSON:', error);
    }

    return paths;  // Return the paths after data is fetched and processed
}


const prevMinisButton = pagerCarousel.querySelector('.carousel-control-prev');
const nextMinisButton = pagerCarousel.querySelector('.carousel-control-next');

prevMinisButton.addEventListener('click', () => {
    console.log('Previous Mini button clicked');
    loadNextMini(-1);  
});

nextMinisButton.addEventListener('click', () => {
    console.log('Next Mini button clicked');
    loadNextMini(1);  
});

async function loadNextMini(direction) {
    if(allSlidesHere){
        const activeItem = pagerCarousel.querySelector('.carousel-item.active');  //find the active slide, there must be one
        const ItemIndex = parseInt(activeItem.dataset.index); // Convert int index to integer
        if (ItemIndex !== null && !isNaN(ItemIndex)) {
                currentMini=((currentMini+direction)+numOfArticles)%numOfArticles;
                let minisPaths = await getDesiredPaths(5,true,direction);
                const targetIndex=((ItemIndex-(2*direction))+minisPerSlide)%minisPerSlide;//the index of the division that is to be updated is the "furthest" from the active slide
                const targetPagerCarouselItem = pagerCarousel.querySelector(`.carousel-item[data-index="${targetIndex}"]`);   //find this division according to the value of data-filter-index
                const buttons = targetPagerCarouselItem.querySelectorAll('button');
                for (let i = 0; i < minisPerSlide; i++) {
                    const bttn = buttons[i] ;
                    
                    const numslide=(((currentMini+i)+numOfArticles)%numOfArticles)+1;
                    bttn.querySelector('img').src = minisPaths[i];
                    bttn.querySelector('.card-img-overlay').innerText = numslide.toString();
                }
        } else {
            console.error('No active slide or invalid filterIndex');
        }
    }   
}


// Function to execute on screen click
window.addEventListener('click', function() {
    // Delay execution by 0.5 seconds (500 milliseconds)
    setTimeout(function() {
        // Step 1: Find the active div inside projectCarousel
        var activeElement = document.querySelector('#projectCarousel .active');
        
        // Step 2: Get the value of the data-filter-index attribute
        if (activeElement) {
            var activeIndex = activeElement.getAttribute('data-filter-index');

            // Step 3: Iterate over all buttons in pagerCarouselCopy
            var buttons = document.querySelectorAll('#pagerCarousel button');

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
            console.log(`${activeIndex}`)
        }
    }, 700);
});
