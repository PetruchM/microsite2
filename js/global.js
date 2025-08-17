// Function to log display information
function logDisplayInfo() {
    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Device pixel ratio (DPR)
    const devicePixelRatio = window.devicePixelRatio;

    // Screen dimensions
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    // Physical screen dimensions in millimeters
    const screenWidthMM = screenWidth / devicePixelRatio * 25.4; // Convert inches to millimeters
    const screenHeightMM = screenHeight / devicePixelRatio * 25.4; // Convert inches to millimeters

    // Screen resolution (pixels per inch)
    const screenResolutionX = screenWidth / screenWidthMM;
    const screenResolutionY = screenHeight / screenHeightMM;

    // Log display information
    console.log("Viewport Width:", viewportWidth);
    console.log("Viewport Height:", viewportHeight);
    console.log("Device Pixel Ratio:", devicePixelRatio);
    console.log("Screen Width:", screenWidth);
    console.log("Screen Height:", screenHeight);
    console.log("Screen Resolution (X):", screenResolutionX.toFixed(2), "pixels per inch");
    console.log("Screen Resolution (Y):", screenResolutionY.toFixed(2), "pixels per inch");

    /*
Viewport Width and Height: The dimensions of the viewport within the browser window.
Device Pixel Ratio (DPR): The ratio of physical pixels to CSS pixels on the device.
Screen Width and Height: The dimensions of the entire screen in pixels.
Screen Resolution (X and Y): The resolution of the screen in pixels per inch (PPI), calculated based on the physical dimensions of the screen in millimeters.
    */
}

// Call the function to log display information
logDisplayInfo();

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
