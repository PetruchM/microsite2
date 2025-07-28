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
  'LÉKAŘSKÉÉ A BIOLOGICKÉ VĚDY',
  'SPOLEČENSKÉ A HUMANITNÍ VĚDY',
  'ZEMĚDĚLSKÉ A BIOLOGICKO ENVIROMENTÁLNÍ VĚDY',
];

/* Debounced label hide */
const hideLabel = debounce(() => filterLabel.classList.remove('label-active'), 3000);

/* Initialize Bootstrap carousel */
const bsCarousel = new bootstrap.Carousel(projectCarousel);
// const bsPagerCarousel = new bootstrap.Carousel(pagerCarousel);

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
    currentFilter = CONFIG.ALL_FILTER_INDEX;
    await filterCarousel(CONFIG.ALL_FILTER_INDEX);
  }
}

async function filterCarousel(index) {
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


/* Carousel navigation buttons */
const prevButton = projectCarousel.querySelector('.carousel-control-prev');
const nextButton = projectCarousel.querySelector('.carousel-control-next');
const prevMinisButton = pagerCarousel.querySelector('.splide__arrow--prev');
const nextMinisButton = pagerCarousel.querySelector('.splide__arrow--next');

prevButton.addEventListener('click', () => CarouselButtonClicked(-1,false));
nextButton.addEventListener('click', () => CarouselButtonClicked(1,false));
prevMinisButton.addEventListener('click', () => CarouselButtonClicked(-1,true));
nextMinisButton.addEventListener('click', () => CarouselButtonClicked(1,true));

function CarouselButtonClicked(direction,pager) {
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
  hideAll();
  direction === -1 ? splide.go('-2')
                   : splide.go('+2');
  bsCarousel.to((activeSlideNum + 2*direction + CONFIG.ARTICLES_PER_FILTER) % CONFIG.ARTICLES_PER_FILTER);
  for (let i = 0; i < 2; i++) {
    const slideIdx = (activeSlideNum + i * direction + CONFIG.ARTICLES_PER_FILTER) % CONFIG.ARTICLES_PER_FILTER;
    loadNextArticle(slides[slideIdx], direction);
  }
}

/* Pager cards click */
function PagerCardClicked(activeSlideId, clickedId) {
  const activeSlide = projectCarousel.querySelector('.carousel-item.active');
  const activeSlideNum = parseInt(activeSlide.getAttribute('data-filter-index'), 10);
  const pagerSlidePos = (clickedId - activeSlideId + CONFIG.TOTAL_ARTICLES) % CONFIG.TOTAL_ARTICLES;
  switch (pagerSlidePos) {
    case 0: EdgePagerSlideClicked(activeSlideNum, -1); break;
    case 1: CarouselButtonClicked(-1); break;
    case 3: CarouselButtonClicked(1); break;
    case 4: EdgePagerSlideClicked(activeSlideNum, 1); break;
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
  const nowPC = window.innerWidth >= 1024;
  if (nowPC !== onPC) {
    onPC = nowPC;
    filterCarousel(currentFilter);
  }
}
