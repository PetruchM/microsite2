/* Centralized configuration for "magic numbers" */
const CONFIG = {
  ARTICLES_PER_FILTER: 5,
  MINIS_PER_SLIDE: 5,
  MINIS_UNFILTERED: 9,
  TOTAL_ARTICLES: 25,
  ALL_FILTER_INDEX: 5,
};

/* Cached state and flags */
let articlesData;
let currentSlide = 0;
let currentFilter = CONFIG.ALL_FILTER_INDEX;
let onPC;

/* Load articles.json once and cache */
async function loadArticles() {
  if (!articlesData) {
    const res = await fetch('articles.json');
    articlesData = await res.json();
  }
  return articlesData;
}

/* Debounce helper */
const debounce = (fn, ms) => {
  let tid;
  return (...args) => {
    clearTimeout(tid);
    tid = setTimeout(() => fn(...args), ms);
  };
};

/* Build array of article IDs for filtered or unfiltered views */
function buildIdList({ filterIndex, count, offset = 2, slide = currentSlide }) {
  const ids = [];
  for (let i = 0; i < count; i++) {
    if (filterIndex !== CONFIG.ALL_FILTER_INDEX) {
      ids.push(i * CONFIG.ARTICLES_PER_FILTER + filterIndex);
    } else {
      ids.push((slide - offset + i + CONFIG.TOTAL_ARTICLES) % CONFIG.TOTAL_ARTICLES);
    }
  }
  return ids;
}

/* DOM elements */
const projectCarousel = document.getElementById('projectCarousel');
const slides = Array.from(projectCarousel.querySelectorAll('.carousel-item'));
const filtersDivision = document.getElementById('filter');
const pagerCarousel = document.getElementById('pager-carousel');
const pagerItems = Array.from(pagerCarousel.querySelectorAll('.slide_template'));
const pcFilterButtons = Array.from(
  filtersDivision.querySelector('.carousel__filter-container').children
);
const filterLabel = filtersDivision.querySelector('.carousel__filter-label');
const filterNames = [
  'TECHNICKÉ VĚDY',
  'VĚDY O NEŽIVÉ PŘÍRODĚ',
  'LÉKAŘSKÉ A BIOLOGICKÉ VĚDY',
  'SPOLEČENSKÉ A HUMANITNÍ VĚDY',
  'ZEMĚDĚLSKÉ A BIOLOGICKO ENVIROMENTÁLNÍ VĚDY',
];

/* Debounced label hide */
const hideLabel = debounce(() => filterLabel.classList.remove('label-active'), 3000);

/* Initialize Bootstrap carousel */
const bsCarousel = new bootstrap.Carousel(projectCarousel)

/* Event listeners for filter buttons */
pcFilterButtons.forEach((btn, idx) => {
  btn.addEventListener('click', () => setFilter(btn, idx));
});

async function setFilter(button, index) {
  const wasActive = button.classList.contains('active-filter');
  filtersDivision.querySelectorAll('.active-filter').forEach(el => el.classList.remove('active-filter'));
  clearTimeout();

  if (!wasActive) {
    button.classList.add('active-filter');
    filterLabel.textContent = filterNames[index];
    filterLabel.classList.add('label-active');
    hideLabel();

    currentFilter = index;
    await filterCarousel(index);
  } else {
    filterLabel.classList.remove('label-active');
    currentSlide = 0;///temporary set to 0, reseting
    currentFilter = CONFIG.ALL_FILTER_INDEX;
    await filterCarousel(CONFIG.ALL_FILTER_INDEX);
  }
}

async function filterCarousel(index) {
  hideAll();
  await updateSlides(index);
  activateDesiredSlide(index);
  updatePagerCarousel(index);
  // activateDesiredPagerSlide(index);
}

/* Update main slides */
async function updateSlides(filterIndex) {
  const ids = buildIdList({
    filterIndex,
    count: CONFIG.ARTICLES_PER_FILTER,
  });
  await changeSlidesInfo(ids, slides);
}

async function changeSlidesInfo(ids, elements) {
  try {
    const data = await loadArticles();
    ids.forEach((id, i) => {
      const article = data[id];
      const slide = elements[i];
      if (!article) return console.warn(`No article for ID ${id}`);

      const bgKey = onPC ? 'background_img' : 'background_img_phone';
      slide.querySelector('.a-background-img').src       = article[bgKey];
      slide.querySelector('.a-title').innerText          = article.title;
      slide.querySelector('.project-motto-text').innerText = article.project_motto_text;
      slide.querySelector('.author-img').src              = article.author_img;
      slide.querySelector('.author-name').innerText       = article.author_name;
      slide.querySelector('.author-institute').innerHTML  = article.author_institute;
      slide.querySelector('.project-info-text').innerHTML = article.text;
      slide.querySelector('.project-info-text-mobile').innerHTML = article.text;

      slide.setAttribute('data-id', id);
    });
  } catch (err) {
    console.error('Failed loading articles:', err);
  }
}

/* Activate relevant slide and pager item */
function activateDesiredSlide(filterIndex) {
  slides.forEach(s => s.classList.remove('active'));

  const activeSlideIdx = (filterIndex === CONFIG.ALL_FILTER_INDEX) ? 2 : 0;
  slides[activeSlideIdx].classList.add('active');
}


/* Carousels sliding handeling */
const prevButton = projectCarousel.querySelector('.carousel-control-prev');
const nextButton = projectCarousel.querySelector('.carousel-control-next');
const prevMinisButton = pagerCarousel.querySelector('.splide__arrow--prev');
const nextMinisButton = pagerCarousel.querySelector('.splide__arrow--next');

const COOLDOWN_MS = 700;
let locked = false;
let unlockTimer = null;

prevButton.addEventListener('click', () => CarouselButtonClicked(-1,false));
nextButton.addEventListener('click', () => CarouselButtonClicked(1,false));
prevMinisButton.addEventListener('click', () => CarouselButtonClicked(-1,true));
nextMinisButton.addEventListener('click', () => CarouselButtonClicked(1,true));

function checkingSynchro() {
    const activeSlide = projectCarousel.querySelector('.carousel-item.active');
    const activeArticleIndex = parseInt(activeSlide.getAttribute('data-id'), 10);
    if (GetCurrentPagerSlideIndex() !== activeArticleIndex) {
      if (locked) return;      // během cooldownu ignoruj

      locked = true;
      try {
        SynchronizePager(activeArticleIndex);
      } finally {
        // minimální cooldown – další pokusy se ignorují
        clearTimeout(unlockTimer);
        unlockTimer = setTimeout(() => { locked = false; }, COOLDOWN_MS);
      }
    }
}

function SynchronizePager(activeArticleIndex){
  let currentPagerSlide = GetCurrentPagerSlideIndex();
  if (currentFilter !== CONFIG.ALL_FILTER_INDEX) { //if filtered the all possible id belong to one ressidual class so we devide os that the values are 0-4
    activeArticleIndex = Math.floor(activeArticleIndex/CONFIG.ARTICLES_PER_FILTER);
    currentPagerSlide = Math.floor(currentPagerSlide/CONFIG.ARTICLES_PER_FILTER);
  }
  let pagerSlidePos = (activeArticleIndex -currentPagerSlide + CONFIG.TOTAL_ARTICLES) % CONFIG.TOTAL_ARTICLES;
  pagerSlidePos =  pagerSlidePos % CONFIG.ARTICLES_PER_FILTER; // Ensure it's within 0-4 range, because if the carousel is not filtered we work with values 0-24
  switch (pagerSlidePos) {
    case 3: splide.go('-2'); break; //two backward
    case 4: splide.go('-1'); break;
    case 1: splide.go('+1'); break;
    case 2: splide.go('+2'); break; //two forward
    default: break;
  }
};

function CarouselButtonClicked(direction, pager) {
  if (locked) return;      // během cooldownu ignoruj

  locked = true;
  try {
    runSync(direction, pager);
  } finally {
    // minimální cooldown – další pokusy se ignorují
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(() => { locked = false; }, COOLDOWN_MS);
  }
}
function runSync(direction, pager) {
  hideAll();
  direction === -1 ? bsCarousel.prev()
                    : bsCarousel.next();
  if (!pager) {
    if (direction === -1) {
      splide.go('<');
    } else {
      splide.go('>');
    }
  }
  const activeSlide = projectCarousel.querySelector('.carousel-item.active');
  loadNextArticle(activeSlide, direction);
}

function EdgePagerSlideClicked(activeSlideNum, direction) {
  if (locked) return;      // během cooldownu ignoruj

  locked = true;
  try {
    console.log("Edge pager slide clicked with direction:", direction);
    hideAll();
    direction === -1 ? splide.go('-2')
                    : splide.go('+2');
    bsCarousel.to((activeSlideNum + 2*direction + CONFIG.ARTICLES_PER_FILTER) % CONFIG.ARTICLES_PER_FILTER); //move 2 slides forward/backward
    for (let i = 0; i < 2; i++) { //load new in advance next/previous 2 articles
      const slideIdx = (activeSlideNum + i * direction + CONFIG.ARTICLES_PER_FILTER) % CONFIG.ARTICLES_PER_FILTER;
      loadNextArticle(slides[slideIdx], direction);
    }
  } finally {
    // minimální cooldown – další pokusy se ignorují
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(() => { locked = false; }, COOLDOWN_MS);
  }
}

/* Pager cards click */
function PagerCardClicked(clickedId) {
  // console.log("Pager card clicked with ID:", clickedId);
  // console.log("Current pager slide:", currentPagerSlide);
  const activeSlide = projectCarousel.querySelector('.carousel-item.active');
  const activeSlideNum = parseInt(activeSlide.getAttribute('data-filter-index'), 10);
  let currentPagerSlide = GetCurrentPagerSlideIndex();
  if (currentFilter !== CONFIG.ALL_FILTER_INDEX) { //if filtered the all possible id belong to one ressidual class so we devide os that the values are 0-4
    clickedId = Math.floor(clickedId/CONFIG.ARTICLES_PER_FILTER);
    currentPagerSlide = Math.floor(currentPagerSlide/CONFIG.ARTICLES_PER_FILTER);
  }
  let pagerSlidePos = (clickedId -currentPagerSlide + CONFIG.TOTAL_ARTICLES) % CONFIG.TOTAL_ARTICLES;
  pagerSlidePos =  pagerSlidePos % CONFIG.ARTICLES_PER_FILTER; // Ensure it's within 0-4 range, because if the carousel is not filtered we work with values 0-24
  switch (pagerSlidePos) {
    case 3: EdgePagerSlideClicked(activeSlideNum, -1); break; //two backward
    case 4: CarouselButtonClicked(-1); break;
    case 1: CarouselButtonClicked(1); break;
    case 2: EdgePagerSlideClicked(activeSlideNum, 1); break; //two forward
    default: break;
  }
};

/* Load next main article on edge scroll */
function loadNextArticle(activeSlide, direction) {
  if (currentFilter === CONFIG.ALL_FILTER_INDEX) {
    const filterIdx = parseInt(activeSlide.getAttribute('data-filter-index'), 10);
    currentSlide = (currentSlide + direction + CONFIG.TOTAL_ARTICLES) % CONFIG.TOTAL_ARTICLES;
    const newId = (currentSlide + 2 * direction + CONFIG.TOTAL_ARTICLES) % CONFIG.TOTAL_ARTICLES;
    const targetIdx = (filterIdx - 2 * direction + CONFIG.ARTICLES_PER_FILTER) % CONFIG.ARTICLES_PER_FILTER;
    const targetSlide = slides.find(s => parseInt(s.dataset.filterIndex, 10) === targetIdx);
    if (targetSlide) changeSlidesInfo([newId], [targetSlide]);
  }
}

/* Handle window resize for background image switch */

function updateCarousels(){
  const nowPC = window.innerWidth >= 800;
  if (nowPC !== onPC) {
    onPC = nowPC;
    filterCarousel(currentFilter);
  }
}
