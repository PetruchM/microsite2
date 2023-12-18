// console log inner screen width
console.log(window.innerWidth);

function slideRectangle1() {
    var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
    var wasActive = rectangle2.classList.toggle('info_active1');
    var rec2content = rectangle2.querySelector('.box-info2-content');
    rec2content.classList.toggle('opacity80');

    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.toggle('info_ready2');
    if (!wasActive) {
        hideAll();
    }
}

function slideRectangle2() {
    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    // rectangle3.classList.remove('info_ready2');
    rectangle3.classList.toggle('info_active2');
    var rec3content = rectangle3.querySelector('.box-info3-content');
    rec3content.classList.toggle('opacity80');
}

function hideAll() {
    var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
    rectangle2.classList.remove('info_active1');
    var rec2content = rectangle2.querySelector('.box-info2-content');
    rec2content.classList.remove('opacity80');

    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    // rectangle3.classList.remove('info_ready2');
    rectangle3.classList.remove('info_active2');
    var rec3content = rectangle3.querySelector('.box-info3-content');
    rec3content.classList.remove('opacity80');
}