function updatePcOrMobile(){
    updateBackground();
    updatePathBasedOnWidth();
    updateCarouselCardsFunctions();
}

updatePcOrMobile();

window.addEventListener('resize', updatePcOrMobile);