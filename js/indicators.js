// JS for the lower part of website
const textsNodeArr = document.querySelectorAll(".single-indicator-p");
const texts = Array.from(textsNodeArr);

function slideDownText(textIndex) {
    var text = texts[textIndex]
    if (text.classList.contains("active")) {
        text.classList.remove("active");
    } else {
        text.classList.add("active");
    }
}

const textLogo = document.querySelector(".logo-container-p");
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