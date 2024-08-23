// JS for the lower part of website
const textsNodeArr = document.querySelectorAll(".single-indicator-p");
const texts = Array.from(textsNodeArr);


function slideDownText(textIndex) {
    var text = texts[textIndex]
    var imgElement = document.getElementById('indicator1');
    if (text.classList.contains("active")) {
        text.classList.remove("active");
        if (textIndex==0){
            imgElement.src = 'images/svgs/Lahev 1.svg';
        }
    } else {
        text.classList.add("active");
        if (textIndex==0){
            imgElement.src = 'images/svgs/Lahev 2.svg';
        }
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