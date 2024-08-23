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