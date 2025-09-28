// JS for the lower part of website
const textsNodeArr = document.querySelectorAll(".single-indicator-p");
const texts = Array.from(textsNodeArr);
const indiNodeArr = document.querySelectorAll(".single-indicator");
const indicators = Array.from(indiNodeArr);
const imgs2NodeArr = document.querySelectorAll(".indicator-svg2");
const imgs2 = Array.from(imgs2NodeArr);
const buttonsNodeArr = document.querySelectorAll(".indicator-slide_butt");
const buttons = Array.from(buttonsNodeArr);


function IndicatorActive(Index) {
    var textElement = texts[Index+1];
    var indiElement = indicators[Index+1];
    var img2Element = imgs2[Index];
    var buttonElement = buttons[Index+1];
    if (textElement.classList.contains("active")) {
        textElement.classList.remove("active");
        indiElement.classList.remove("active");
        buttonElement.classList.remove("indicator_button_rotate");
        img2Element.style.opacity="0";
    } else {
        textElement.classList.add("active");
        indiElement.classList.add("active");
        buttonElement.classList.add("indicator_button_rotate");
        img2Element.style.opacity="1";
    }
}
    

function slideDownTextLogo() {
    var textLogo  = texts[0]
    var indiElement = indicators[0];
    var buttonElement = buttons[0];
    if (textLogo.classList.contains("active")) {
        textLogo.classList.remove("active");
        indiElement.classList.remove("active");
        buttonElement.classList.remove("indicator_button_rotate");
    } else {
        textLogo.classList.add("active");
        indiElement.classList.add("active");
        buttonElement.classList.add("indicator_button_rotate");
    }
}

function scrollIndicators(button){
    if (button.classList.contains("first")) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        const scrollAmount = window.innerHeight * 0.95;
        window.scrollBy({
            top: scrollAmount,
            left: 0,
            behavior: 'smooth'
        });
    }
}

const slideDownButtFirst = document.querySelector(".slideDownButt.first");
const slideDownButtSecond = document.querySelector(".slideDownButt.second");

window.addEventListener("scroll", () => {
    if (window.scrollY >= window.innerHeight * 0.2) {
        slideDownButtSecond.classList.remove("highlight");
        slideDownButtFirst.classList.remove("hidden");
    } else {
        slideDownButtFirst.classList.add("hidden");
    }
});

(function () {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const root = document.documentElement;
  const gapPx = 8; // mezera nad footerem v px

  function updateArrowOffset() {
    const rect = footer.getBoundingClientRect();
    // kolik footer „leze“ do viewportu
    const overlap = Math.max(0, window.innerHeight - rect.top);
    // když se footer objeví, zvedni šipky o overlap + mezeru
    root.style.setProperty('--avoid-footer', (overlap ? overlap + gapPx : 0) + 'px');

    if (slideDownButtSecond) {
      const hide = overlap > 0;
      slideDownButtSecond.classList.toggle('hidden', hide);
      slideDownButtSecond.setAttribute('aria-hidden', hide ? 'true' : 'false');
      // zajistí, že nepůjde omylem focusnout klávesnicí
      if (hide) slideDownButtSecond.setAttribute('tabindex', '-1'); else slideDownButtSecond.removeAttribute('tabindex');
    }

  }

  updateArrowOffset();
  window.addEventListener('scroll', updateArrowOffset, { passive: true });
  window.addEventListener('resize', updateArrowOffset);
})();

//changes the svg paths in the curved dashed line border and the mask that are between the two main divisions
function updatePathBasedOnWidth() {
    const windowWidth = window.innerWidth;

    const linepathElement = document.getElementById('linepath');

    //M 0 0.02 Q 0.25 0 0.5 0.02 T 1 0.02 L 1 0 L 0 0 Z
    const defaultLinePath = "M 0 24 Q 250 -16 500 24 T 1000 24"; //M 0 20 Q 250 52 500 20 T 1000 20
    const narrowLinePath = "M 0 20 Q 250 -40 500 20 T 1000 20";

    // Change the path based on the window width
    if (windowWidth < 800) {
        linepathElement.setAttribute('d', narrowLinePath);
    } else {
        linepathElement.setAttribute('d', defaultLinePath);
    }
}