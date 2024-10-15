const articlesPerFilter=5;
const numOfArticles=25;
const projectCarousel = document.getElementById('projectCarousel');
const filtersDivision = document.getElementById('filter');
const pagerCarousel = document.getElementById('pagerCarousel');
const pcFilterButtons = Array.from(filtersDivision.querySelector('.carousel__filter-container').children);
const filterLabel = filtersDivision.querySelector('.carousel__filter-label');
const filters = ['tech', 'unnat', 'bio', 'socio', 'env'];
const filterNames = {
   tech: 'TECHNICKÉ VĚDY',
   unnat: 'VĚDY O NEŽIVÉ PŘÍRODĚ',
   bio: 'LÉKAŘSKÉ A BIOLOGICKÉ VĚDY',
   socio: 'SPOLEČENSKÉ A HUMANITNÍ VĚDY',
   env: 'ZEMĚDĚLSKÉ A BIOLOGICKO ENVIROMENTÁLNÍ VĚDY'
};
let filterTimeout;
let currentSlide = 0;  //we want to remember on which slide user ended
let allSlides=true;


pcFilterButtons.forEach((button, index) => {
   button.addEventListener('click', () => setFilter(button, index));
});

function setFilter(button, index) {
    console.log('filter button ' + index + ' clicked');

    const filterActive = button.classList.contains('active-filter');
    const filterClass = filters[index];
    filtersDivision.querySelectorAll('.active-filter').forEach(el => el.classList.remove('active-filter'));  //find the active filter, if there is one and remove the active tag
    clearTimeout(filterTimeout); //prevents changing filters too fast or prevents bugs ???????????????????????????????????,,

    if (!filterActive) {   //if clicked filter is not active
            button.classList.add('active-filter');  //mark this filter as active
            filterLabel.textContent = filterNames[filterClass];  //set the filter label //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,
            filterLabel.classList.add('label-active'); //mark it as active

            filterTimeout = setTimeout(deactivateFilterLabel, 3000);  //sets the time for the function execution to 3s

            filterCarousel(index); //makes changes in the carousel

            console.log("Current filter is:", filterClass);
            allSlides=false;

    } else { //filter is active, disable it
            deactivateFilterLabel();
            filterCarousel(5);
            allSlides=true;
    }
}

function deactivateFilterLabel() {
    filterLabel.classList.remove('label-active');
}

function filterCarousel(index) {
    changeSlides(index);
    activateDesiredSlide(index);
    updatePagerCarousel(index,currentSlide);
    // generatePagerCarouselPlain();
    // generatePagerCarousel('all');//-------------
}

function changeSlides(index) {
    const slideDivisions = projectCarousel.querySelectorAll('.carousel-item');
    let desiredArticles = getDesiredArticlesIDs(index);  //array will keep the ids of articles that corespond the the situation

    changeSlidesInfo(desiredArticles,slideDivisions);
}

function getDesiredArticlesIDs(index){
    let desiredArray = [0, 1, 2, 3, 4];
    for (let i = 0; i < articlesPerFilter; i++) {
        if (index !== articlesPerFilter) { //if it is filter with index 1 e.g, isnt 5 which
            desiredArray[i] = i * 5 + index; //it will be slides 1,6,11,16,21 
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
                const article = data.find(article => article.id === id); //load the article
                const slide=elements[counter];  //in each iteration choose the next division
                counter++

                if (article) { //set all wanted data for this article to the slide
                    console.log(`Article for ID ${id}:`, article);
                    
                    slide.querySelector('.a-background-img').src = article.background_img;
                    slide.querySelector('.a-title').innerText = article.title;
                    slide.querySelector('.project-motto-text').innerText=article.project_motto_text;
                    slide.querySelector('.author-img').src = article.author_img;
                    slide.querySelector('.author-name').innerText = article.author_name;
                    slide.querySelector('.author-institute').innerText = article.author_institute;
                    slide.querySelector('.project-info-text').innerText = article.text;

                    console.log(`Article changed successfully for ID ${id}:`, article);
                } else {
                    console.log(`No article found for ID ${id}`);
                }
            });
        })
    .catch(error => console.error('Error fetching JSON:', error))
}

function activateDesiredSlide(index){  //will activate the slide that the user will look at after filtering
    const items = projectCarousel.querySelectorAll('.carousel-item');
    const pagerItems = pagerCarousel.querySelectorAll('.carousel-item'); //and in the pager too
    for (let i = 0; i < articlesPerFilter; i++) {
        items[i].classList.remove('active');
        pagerItems[i].classList.remove('active');
    }
    const activeIndex = (index === 5) ? 2 : 0;  //this index 2 or 0, refers to the desiredArticles forloop.
    items[activeIndex].classList.add('active');
    pagerItems[0].classList.add('active');  //while filtered and unfiltered, the first item will be activated
}

//lower code handles changing the articles when clicking the carousel buttons on sides
const prevButton = projectCarousel.querySelector('.carousel-control-prev');
const nextButton = projectCarousel.querySelector('.carousel-control-next');

prevButton.addEventListener('click', () => {
    console.log('Previous button clicked');
    loadNextArticle(-1);  
});

nextButton.addEventListener('click', () => {
    console.log('Next button clicked');
    loadNextArticle(1);  
});

function loadNextArticle(direction) {
    if(allSlides){
        const activeSlide = projectCarousel.querySelector('.carousel-item.active');  //find the active slide, there must be one
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


