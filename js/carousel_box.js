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

var currentCategory = 'all';

function filterCarousel(category) {
    if (category == currentCategory) {
        category = 'all';
    }
    if (category == 'all') {
        showAllSlides();
        currentCategory = 'all';
        return;
    }
    currentCategory = category; 
    console.log("Filtering with: " + currentCategory);

    // find all items with class item-flag
    var items = document.querySelectorAll('.item-flag');
    // loop through each item
    for (var i = 0; i < items.length; i++) {
        // if the item doesn't have the category as a class, add the class hidden
        if (!items[i].classList.contains(category)) {
            items[i].classList.add('d-none');
            items[i].classList.remove('active');
            items[i].classList.remove('carousel-item');
        }
        else {
            items[i].classList.remove('d-none');
            items[i].classList.add('carousel-item');
        }
    }
    // add active to the first item with class carousel-item
    var active = document.querySelector('.carousel-item');
    active.classList.add('active');
}

function showAllSlides() {
    console.log("showing all slides")
    var items = document.querySelectorAll('.item-flag');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('d-none');
        items[i].classList.add('carousel-item');
    }
}