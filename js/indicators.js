// JS for the lower part of website
const textsNodeArr = document.querySelectorAll(".single-indicator-p");
const texts = Array.from(textsNodeArr);
const indiNodeArr = document.querySelectorAll(".single-indicator");
const indicators = Array.from(indiNodeArr);
const imgs2NodeArr = document.querySelectorAll(".indicator-svg2");
const imgs2 = Array.from(imgs2NodeArr);


function IndicatorActive(Index) {
    var textElement = texts[Index+1];
    var indiElement = indicators[Index+1];
    var img2Element = imgs2[Index];
    if (textElement.classList.contains("active")) {
        textElement.classList.remove("active");
        indiElement.classList.remove("active");
        // img2Element.style.opacity="0";
    } else {
        textElement.classList.add("active");
        indiElement.classList.add("active");
        img2Element.style.opacity="1";
    }
}
    

function slideDownTextLogo() {
    var textLogo  = texts[0]
    var indiElement = indicators[0];
    if (textLogo.classList.contains("active")) {
        textLogo.classList.remove("active");
        indiElement.classList.remove("active");
    } else {
        textLogo.classList.add("active");
        indiElement.classList.add("active");
    }
}

function scrollDown(){
    const scrollAmount = window.innerHeight * 0.80;
    window.scrollBy({
        top: scrollAmount,
        left: 0,
        behavior: 'smooth'
    });
}

//changes the svg paths in the curved dashed line border and the mask that are between the two main divisions
function updatePathBasedOnWidth() {
    const windowWidth = window.innerWidth;

    const linepathElement = document.getElementById('linepath');

    const defaultLinePath = "M 0 24 Q 250 -14 500 24 T 1000 24"; //M 0 20 Q 250 52 500 20 T 1000 20
    const narrowLinePath = "M 0 20 Q 250 76 500 20 T 1000 20";

    // Change the path based on the window width
    if (windowWidth < 1215) {
        linepathElement.setAttribute('d', narrowLinePath);
    } else {
        linepathElement.setAttribute('d', defaultLinePath);
    }
}