function updatePcOrMobile(){
    updateCarousels();
    updatePathBasedOnWidth();
    setVh();
    // updateCarouselCardsFunctions();
}
function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
updatePcOrMobile();

window.addEventListener('resize', updatePcOrMobile);
