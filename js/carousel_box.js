// ===== A11y helpers =====
// This code is used to manage the interactivity and focus of elements in the carousel, because box2 and box3 are inert by default.
function setInteractive(el, on) {
  if (!el) return;
  if (on) {
    el.removeAttribute('inert');
    el.removeAttribute('aria-hidden');
  } else {
    el.setAttribute('inert', '');
    el.setAttribute('aria-hidden', 'true');
  }
}

// ===== Slide functions =====
function slideSecondCard() {
  var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
  var wasActive = rectangle2.classList.toggle('info_active1');

  var rec2content = rectangle2.querySelector('.box-info2-content');
  rec2content.classList.toggle('opacity85');

  var button1 = document.querySelector('.carousel-item.active .slide_butt1');
  button1.classList.toggle('button_rotate_on_activation');

  var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
  rectangle3.classList.toggle('info_ready2'); // jen přesun, stále zůstane inert

  // A11y: nastav interaktivitu podle stavu card2
  var isActive2 = rectangle2.classList.contains('info_active1');
  setInteractive(rectangle2, isActive2);
  button1.setAttribute('aria-expanded', String(isActive2));

  // card3 zůstává neinteraktivní, dokud se výslovně neotevře
  var isActive3 = rectangle3.classList.contains('info_active2');
  setInteractive(rectangle3, isActive3);

  if (isActive2) {
    // po otevření pošli fokus dovnitř karty
    rec2content.focus();
  } else {
    // po zavření vrať fokus na tlačítko
    button1.focus();
  }

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

  // A11y: card3 on/off
  var isActive3 = rectangle3.classList.contains('info_active2');
  setInteractive(rectangle3, isActive3);
  button2.setAttribute('aria-expanded', String(isActive3));

  if (isActive3) {
    rec3content.focus();
  } else {
    button2.focus();
  }
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

  // A11y: po resetu vše zase neinteraktivní/skryté pro SR
  setInteractive(rectangle2, false);
  setInteractive(rectangle3, false);
  button1.setAttribute('aria-expanded', 'false');
  button2.setAttribute('aria-expanded', 'false');
}
// ===== Original functions (for reference) =====
// function slideSecondCard() {
//     var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
//     var wasActive = rectangle2.classList.toggle('info_active1');
//     var rec2content = rectangle2.querySelector('.box-info2-content');
//     rec2content.classList.toggle('opacity85');
//     var button1 = document.querySelector('.carousel-item.active .slide_butt1');
//     button1.classList.toggle('button_rotate_on_activation');

//     var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
//     rectangle3.classList.toggle('info_ready2');
//     if (!wasActive) {
//         hideAll();
//     }
// }

// function slideThirdCard() {
//     var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
//     rectangle3.classList.toggle('info_active2');
// 	var rec3content = rectangle3.querySelector('.box-info3-content');
//     rec3content.classList.toggle('opacity85');

//     var button2 = document.querySelector('.carousel-item.active .slide_butt2');
//     button2.classList.toggle('button_rotate_on_activation');

// }

// function hideAll() {
//     var button1 = document.querySelector('.carousel-item.active .slide_butt1');
//     button1.classList.remove('button_rotate_on_activation');

//     var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
//     rectangle2.classList.remove('info_active1');
//     rectangle2.classList.remove('hide_left');
//     var rec2content = rectangle2.querySelector('.box-info2-content');
//     rec2content.classList.remove('opacity85');
//     rec2content.querySelector('.project-info').scrollTop = 0;

//     var button2 = document.querySelector('.carousel-item.active .slide_butt2');
//     button2.classList.remove('button_rotate_on_activation');

//     var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
//     rectangle3.classList.remove('info_ready2');
//     rectangle3.classList.remove('info_active2');
//     var rec3content = rectangle3.querySelector('.box-info3-content');
//     rec3content.classList.remove('opacity85');
//     rec3content.querySelector('.project-info').scrollTop = 0;
// }