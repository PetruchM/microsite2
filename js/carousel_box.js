// console log inner screen width
console.log(window.innerWidth);

function slideRectangle1() {
    var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
    var wasActive = rectangle2.classList.toggle('info_active1');
    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.toggle('info_active1');
    if (!wasActive) {
        hideAll();
    }
}

function slideRectangle2() {
    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.toggle('info_active2');
}

function hideAll() {
    var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
    rectangle2.classList.remove('info_active1');
    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.remove('info_active1');
    rectangle3.classList.remove('info_active2');
}