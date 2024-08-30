// JS for the lower part of website
const textsNodeArr = document.querySelectorAll(".single-indicator-p");
const texts = Array.from(textsNodeArr);
const textLogo = document.querySelector(".logo-container-p");
const imgsNodeArr = document.querySelectorAll(".indicator-svg");
const imgs = Array.from(imgsNodeArr);


function IndicatorActive(Index, imgNormal, imgActive) {
    var textElement = texts[Index]
    var imgElement = imgs[Index]
    if (textElement.classList.contains("active")) {
        textElement.classList.remove("active");
        changeImageSourceSmoothly(imgElement,imgNormal);
    } else {
        textElement.classList.add("active");
        changeImageSourceSmoothly(imgElement,imgActive);
    }
}

function changeImageSourceSmoothly(Element,newSrc) {
    Element.classList.add('fade-out');
    setTimeout(function() {
        Element.src = newSrc;
        Element.classList.remove('fade-out');
    }, 500);
}

function slideDownTextLogo() {

    if (textLogo.classList.contains("active")) {
        textLogo.classList.remove("active");
    } else {
        textLogo.classList.add("active");
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