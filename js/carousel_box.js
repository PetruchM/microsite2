
function slideSecondCard() {
    var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
    var wasActive = rectangle2.classList.toggle('info_active1');
    var rec2content = rectangle2.querySelector('.box-info2-content');
    rec2content.classList.toggle('opacity85');
    var button1 = document.querySelector('.carousel-item.active .slide_butt1');
    button1.classList.toggle('button_rotate_on_activation');

    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.toggle('info_ready2');
    if (!wasActive) {
        hideAll();
    }
}

function slideThirdCard() {
    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.toggle('info_active2');
	var rec3content = rectangle3.querySelector('.box-info3-content');
    rec3content.classList.toggle('opacity85');

    var button2 = document.querySelector('.carousel-item.active .slide_butt2');
    button2.classList.toggle('button_rotate_on_activation');

}

function hideAll() {
    var button1 = document.querySelector('.carousel-item.active .slide_butt1');
    button1.classList.remove('button_rotate_on_activation');

    var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
    rectangle2.classList.remove('info_active1');
    rectangle2.classList.remove('hide_left');
    var rec2content = rectangle2.querySelector('.box-info2-content');
    rec2content.classList.remove('opacity85');
    rec2content.querySelector('.project-info').scrollTop = 0;

    var button2 = document.querySelector('.carousel-item.active .slide_butt2');
    button2.classList.remove('button_rotate_on_activation');

    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.remove('info_ready2');
    rectangle3.classList.remove('info_active2');
    var rec3content = rectangle3.querySelector('.box-info3-content');
    rec3content.classList.remove('opacity85');
    rec3content.querySelector('.project-info').scrollTop = 0;
}