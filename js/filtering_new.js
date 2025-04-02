const articlesPerFilter=5;
const minisPerSlide=5;
const minisWhenUnfiltered=9;
const numOfArticles=25;
const AllSelectedIndex=5;
const projectCarousel = document.getElementById('projectCarousel');
const slideDivisions = projectCarousel.querySelectorAll('.carousel-item');
const filtersDivision = document.getElementById('filter');
const pagerCarousel = document.getElementById('pagerCarousel');
const pagerCarouselItems = pagerCarousel.querySelectorAll('.carousel-item');
const pagerCarouselActiveItems = pagerCarousel.querySelectorAll('.card.active');
const pcFilterButtons = Array.from(filtersDivision.querySelector('.carousel__filter-container').children);
const filterLabel = filtersDivision.querySelector('.carousel__filter-label');
const filterNames = ['TECHNICKÉ VĚDY','VĚDY O NEŽIVÉ PŘÍRODĚ','LÉKAŘSKÉ A BIOLOGICKÉ VĚDY','SPOLEČENSKÉ A HUMANITNÍ VĚDY','ZEMĚDĚLSKÉ A BIOLOGICKO ENVIROMENTÁLNÍ VĚDY']
let filterTimeout;
let currentSlide = 0;  //we want to remember on which slide user ended
let currentFilter = 5;
let allSlides=true;
let isSyncing = false;
let onPC= true;
const syncDelay = 700;



pcFilterButtons.forEach((button, index) => {
   button.addEventListener('click', () => setFilter(button, index));
});

function setFilter(button, index) {
    console.log('filter button ' + index + ' clicked');

    const filterActive = button.classList.contains('active-filter');
    filtersDivision.querySelectorAll('.active-filter').forEach(el => el.classList.remove('active-filter'));  //find the active filter, if there is one and remove the active tag
    clearTimeout(filterTimeout); //prevents changing filters too fast or prevents bugs ???????????????????????????????????,,

    if (!filterActive) {   //if clicked filter is not active
            button.classList.add('active-filter');  //mark this filter as active
            filterLabel.textContent = filterNames[index];  //set the filter label //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,
            filterLabel.classList.add('label-active'); //mark it as active

            filterTimeout = setTimeout(deactivateFilterLabel, 3000);  //sets the time for the function execution to 3s

            filterCarousel(index); //makes changes in the carousel

            console.log("Current filter is:", index);
            allSlides=false;
            currentFilter=index;

    } else { //filter is active, disable it
            deactivateFilterLabel();
            filterCarousel(AllSelectedIndex);
            allSlides=true;
            currentFilter=5;
    }
}

function deactivateFilterLabel() {
    filterLabel.classList.remove('label-active');
}

function filterCarousel(index) {
    changeSlides(index);
    activateDesiredSlide(index);
    updatePagerCarousel(index);
}

function changeSlides(index) {
    let desiredArticles = getDesiredArticlesIDs(index);  //array will keep the ids of articles that corespond the the situation

    changeSlidesInfo(desiredArticles,slideDivisions);
}

function getDesiredArticlesIDs(index){
    let desiredArray = [0, 1, 2, 3, 4];
    for (let i = 0; i < articlesPerFilter; i++) {
        if (index !== AllSelectedIndex) { //if it is filter with index 1 e.g, isnt 5 which
            desiredArray[i] = i * 5 + index; //it will be slides e.g. 1,6,11,16,21 
        } else {                                //if all slides
            desiredArray[i] = ((currentSlide - 2 + i)+numOfArticles)%numOfArticles;  //then we want the current one, 2 previous and 2 next,but not go into negative
        }
    }
    return desiredArray;
}

function changeSlidesInfo(desiredArticles,elements){
    fetch('articles.json')   //load the articles source file
        .then(response => response.json())
        .then(data => {
            let counter=0;
            desiredArticles.forEach(id => {  //for every wanted article. But there may be just one
                const article = data[id]; //load the article
                const slide=elements[counter];  //in each iteration choose the next division
                counter++

                if (article) { //set all wanted data for this article to the slide
                    console.log(`Article for ID ${id}:`, article);
                    
                    if (onPC){
                        slide.querySelector('.a-background-img').src = article.background_img;
                    }else{
                        slide.querySelector('.a-background-img').src = article.background_img_phone;
                    }
                    slide.querySelector('.a-title').innerText = article.title;
                    slide.querySelector('.project-motto-text').innerText=article.project_motto_text;
                    slide.querySelector('.author-img').src = article.author_img;
                    slide.querySelector('.author-name').innerText = article.author_name;
                    slide.querySelector('.author-institute').innerHTML = article.author_institute;
                    slide.querySelector('.project-info-text').innerHTML = article.text;
                    slide.querySelector('.project-info-text-mobile').innerHTML = article.text;    

                    console.log(`Article changed successfully for ID ${id}:`, article);
                } else {
                    console.log(`No article found for ID ${id}`);
                }
            });
        })
    .catch(error => console.error('Error fetching JSON:', error))
}

function activateDesiredSlide(index){  //will activate the slide that the user will look at after filtering
    for (let i = 0; i < articlesPerFilter; i++) {
        slideDivisions[i].classList.remove('active');
        pagerCarouselItems[i].classList.remove('active');
    }
    const activeIndex = (index === AllSelectedIndex) ? 2 : 0;  //this index 2 or 0, refers to the desiredArticles forloop.
    slideDivisions[activeIndex].classList.add('active');
    const activeIndexPager = (index === AllSelectedIndex) ? 0 : 3;
    pagerCarouselItems[activeIndexPager].classList.add('active');  //while filtered and unfiltered, the first item will be activated
}

async function updatePagerCarousel(category){
    console.log(category);
    let articlesPaths = await getDesiredPaths(category,0);

    console.log("Updating pager carousel");

    if (category!=AllSelectedIndex){ //if filtering to one of the chapters
        pagerCarouselItems.forEach(carouselItem => {
            const buttons= carouselItem.querySelectorAll('button');
            buttons.forEach(bttnEl => {
                const numSlide = parseInt(bttnEl.dataset.bsSlideTo, 10); ////--------------------coud be easier just add counter not load data
                bttnEl.querySelector('img').src = articlesPaths[numSlide];
            });
        });
    }else{
        for (let i = 0; i < minisPerSlide; i++) {
            const carouselItem = pagerCarouselItems[((i-2)+minisPerSlide)%minisPerSlide];  //why this? because i want the data-bs-slide-to indexes work acording tot the articles
            const buttons= carouselItem.querySelectorAll('button');
            for (let j = 0; j < minisPerSlide; j++) {
                const bttnEl = buttons[j];
                bttnEl.querySelector('img').src = articlesPaths[i+j];
            } 
        }
    }
    console.log("full carousel chaged")
}

async function getDesiredPaths(category, updating){
    let articles = [];
    let paths = [];
    if (category != AllSelectedIndex) {
        for (let i = 0; i < minisPerSlide; i++) {
            articles.push(i * 5 + category);
        }
    } else if (updating!=0){
        if (updating==1){
            for (let i = 0; i < minisPerSlide; i++) {
                articles.push(((currentSlide + i) + numOfArticles) % numOfArticles);
            }
        }else{ //updating ==-1
            for (let i = 0; i < minisPerSlide; i++) {
                articles.push(((currentSlide - 4 + i) + numOfArticles) % numOfArticles);
            }
        }
        
    }else{ //updating ==0  ->we are generating whole pager
        for (let i = 0; i < minisWhenUnfiltered; i++) {
            articles.push(((currentSlide - 4 + i) + numOfArticles) % numOfArticles);
        }
    }
    console.log("Fetching article data...");
    console.log(`${articles}`)
    try {
        const response = await fetch('articles.json');  // Load the articles source file asynchronously
        const data = await response.json();

        for (let k = 0; k < articles.length; k++) {
            const id = articles[k];
            const article = data[id];  // Load the article based on ID

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

//lower code handles changing the articles when clicking the carousel buttons on sides
const prevButton = projectCarousel.querySelector('.carousel-control-prev');
const nextButton = projectCarousel.querySelector('.carousel-control-next');

const prevMinisButton = pagerCarousel.querySelector('.carousel-control-prev');
const nextMinisButton = pagerCarousel.querySelector('.carousel-control-next');

const bsCarousel = new bootstrap.Carousel(projectCarousel);
const bsPagerCarousel = new bootstrap.Carousel(pagerCarousel);

prevButton.addEventListener('click', () => {
    console.log('Previous button clicked');
    CarouselButtonClicked(-1);
});

nextButton.addEventListener('click', () => {
    console.log('Next button clicked');
    CarouselButtonClicked(1);
});

prevMinisButton.addEventListener('click', () => {
    console.log('Previous Mini button clicked');
    CarouselButtonClicked(-1);
});

nextMinisButton.addEventListener('click', () => {
    console.log('Next Mini button clicked');
    CarouselButtonClicked(1); 
});

function CarouselButtonClicked(direction){
    hideAll(); //hide the card when sliding to nex carousel
    if (!isSyncing) {
        isSyncing = true;
        CardsDeActivation();
        if (direction==-1){
            bsCarousel.prev();
            bsPagerCarousel.prev();
        }else{//==1
            bsCarousel.next();
            bsPagerCarousel.next();
        } 
        
        const activeSlide = projectCarousel.querySelector('.carousel-item.active');
        const activeItem = pagerCarousel.querySelector('.carousel-item.active');
        loadNextArticle(activeSlide,direction); 
        loadNextMini(activeItem,direction);
        setTimeout(() => {
            CardsActivation();
            isSyncing = false;
        }, syncDelay);
    }
}

function CarouselButtonClickedTwice(activeItemNum,pagerItemNum,direction){ //this function is triggered only when usec clicks on edge pagerCard, do basicly the pager carousel is moved up or down twice
    hideAll(); //hide the card when sliding to nex carousel
    if (!isSyncing) {
        isSyncing = true;
        CardsDeActivation();
        slideMultipleTimes(2,direction);
        
        for (let i = 0; i < 2; i++) {
            // console.log("jednou to proslo");
            let activeSlide = slideDivisions[((activeItemNum+(i*direction))+articlesPerFilter)%articlesPerFilter]
            let activeItem = pagerCarouselItems[((pagerItemNum+(i*direction))+minisPerSlide)%minisPerSlide]
            loadNextArticle(activeSlide,direction); 
            loadNextMini(activeItem,direction);
        }
        setTimeout(() => {
            CardsActivation();
            isSyncing = false;
        }, 1.8*syncDelay);
    }
}

function slideMultipleTimes(times, direction) {
    let slideCount = 0; 
    function slide() {
        if (slideCount < times) {
            // console.log("jednou to proslo---------------");
            if (direction === -1) {
                bsPagerCarousel.prev();
            } else {
                bsPagerCarousel.next();
            }
            slideCount++;
            // Wait for the slide transition to finish before sliding again
            setTimeout(slide, syncDelay); // Adjust 600ms to your carousel's transition duration
        }
    }
    slide();
}

function CardsDeActivation(){
    pagerCarouselActiveItems.forEach(card => {
        card.classList.remove('active');
    });
}
function CardsActivation(){
    pagerCarouselActiveItems.forEach(card => {
        card.classList.add('active');
    });
}

const pagerCarouselAllButton = pagerCarousel.querySelectorAll('.card');
pagerCarouselAllButton.forEach((button, index) => {
    button.addEventListener('click', () => MovePagerCarousel(button, index));
});

function MovePagerCarousel(button,index){
    console.log("clicked on edge card")
    const pagerItemNum = Math.floor(index / articlesPerFilter);
    const activeItem=projectCarousel.querySelector('.carousel-item.active');
    const activeItemNum= parseInt(activeItem.getAttribute('data-filter-index'));
    const pagerButtonNum = index%articlesPerFilter;
    console.log(pagerButtonNum)
    switch (pagerButtonNum) {
        case 0:
            CarouselButtonClickedTwice(activeItemNum,pagerItemNum,-1)
            break;
        case 1:
            CarouselButtonClicked(-1);
            break;
        case 3:
            CarouselButtonClicked(1);
            break;
        case 4:
            CarouselButtonClickedTwice(activeItemNum,pagerItemNum,1)
            break;
        default:
            break;
    }
}


function loadNextArticle(activeSlide,direction) {
    if(allSlides){
        //const activeSlide = projectCarousel.querySelector('.carousel-item.active');  //find the active slide, there must be one
        const filterIndex = parseInt(activeSlide.getAttribute('data-filter-index')); // Convert int index to integer
        console.log(`${currentSlide}`)
        if (filterIndex !== null && !isNaN(filterIndex)) {
                currentSlide=((currentSlide+direction)+numOfArticles)%numOfArticles; //change in the current slide acording to the direction of browsing
                const desiredArticleId=((currentSlide+(2*direction))+numOfArticles)%numOfArticles;  //calculate the desired id, it is 2 articles previous or next
                const targetIndex=((filterIndex-(2*direction))+articlesPerFilter)%articlesPerFilter; //the index of the division that is to be updated is the "furthest" from the active slide 
                const targetCarouselItem = projectCarousel.querySelector(`.carousel-item[data-filter-index="${targetIndex}"]`);   //find this division according to the value of data-filter-index
                if (targetCarouselItem) {
                    changeSlidesInfo([desiredArticleId],[targetCarouselItem]);  //change the data
                } else {
                    console.error(`No carousel item found for targetIndex: ${targetIndex}`);
                }
            
        } else {
            console.error('No active slide or invalid filterIndex');
        }
    }   
}

async function loadNextMini(activeItem,direction) {
    if(allSlides){
        //const activeItem = pagerCarousel.querySelector('.carousel-item.active');  //find the active slide, there must be one
        const ItemIndex = parseInt(activeItem.getAttribute('data-index')); // Convert int index to integer
        if (ItemIndex !== null && !isNaN(ItemIndex)) {
                let minisPaths = await getDesiredPaths(AllSelectedIndex,direction);
                const targetIndex=((ItemIndex-(2*direction))+minisPerSlide)%minisPerSlide;//the index of the division that is to be updated is the "furthest" from the active slide
                const targetPagerCarouselItem = pagerCarousel.querySelector(`.carousel-item[data-index="${targetIndex}"]`);   //find this division according to the value of data-filter-index
                const buttons = targetPagerCarouselItem.querySelectorAll('button');
                for (let i = 0; i < minisPerSlide; i++) {
                    const bttn = buttons[i] ;
                    bttn.querySelector('img').src = minisPaths[i];
                }
        } else {
            console.error('No active slide or invalid filterIndex');
        }
    }   
}



function updateBackground(){
    const windowWidth = window.innerWidth;
    let currentOnPc;
    if (windowWidth <1215){
        currentOnPc=false;
    }else{
        currentOnPc=true;
    }

    if (currentOnPc!=onPC){
        onPC=currentOnPc;
        // if (onPC){
        //     pagerCarousel.classList.add('vertical');
        //     pagerCarousel.classList.remove('horizontal');
        // }else{
        //     pagerCarousel.classList.remove('vertical');
        //     pagerCarousel.classList.add('horizontal');
        // }
        setFilter(pcFilterButtons[currentFilter%articlesPerFilter],currentFilter);
    }
}