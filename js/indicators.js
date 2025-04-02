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
    const scrollAmount = window.innerHeight * 0.95;
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

    //M 0 0.02 Q 0.25 0 0.5 0.02 T 1 0.02 L 1 0 L 0 0 Z
    const defaultLinePath = "M 0 24 Q 250 -14 500 24 T 1000 24"; //M 0 20 Q 250 52 500 20 T 1000 20
    const narrowLinePath = "M 0 20 Q 250 -40 500 20 T 1000 20";

    // Change the path based on the window width
    if (windowWidth < 1024) {
        linepathElement.setAttribute('d', narrowLinePath);
    } else {
        linepathElement.setAttribute('d', defaultLinePath);
    }
}