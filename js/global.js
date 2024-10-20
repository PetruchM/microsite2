function updatePcOrMobile(){
    updateBackground();
    updatePathBasedOnWidth();

}

updatePcOrMobile();

window.addEventListener('resize', updatePcOrMobile);