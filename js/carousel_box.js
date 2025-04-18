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

// var IsPcLayout = true;

// function slideRectangleGlobal() {
//     if (IsPcLayout) {
//         slideRectangle1();
//     }
//     else{
//         slideRectangleMobile();
//     }
// }

function slideRectangle1() {
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

function slideRectangle2() {
    var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
    rectangle3.classList.toggle('info_active2');
	var rec3content = rectangle3.querySelector('.box-info3-content');
    rec3content.classList.toggle('opacity85');

    var button2 = document.querySelector('.carousel-item.active .slide_butt2');
    button2.classList.toggle('button_rotate_on_activation');

}

// function slideRectangleMobile() {
//     var rectangle2 = document.querySelector('.carousel-item.active .box-info2');
//     var rectangle3 = document.querySelector('.carousel-item.active .box-info3');
//     var info2WasActive = rectangle2.classList.contains('info_active1')
//     var info3WasActive = rectangle3.classList.contains('info_active2');

//     rectangle2.classList.toggle('info_active1');
//     var rec2content = rectangle2.querySelector('.box-info2-content');
//     rec2content.classList.toggle('opacity85');

//     if (info2WasActive || info3WasActive) {
//         rectangle3.classList.toggle('info_active2');
//         var rec3content = rectangle3.querySelector('.box-info3-content');
//         rec3content.classList.toggle('opacity85');
//     }
// }

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

// function updateCarouselCardsFunctions() {
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;
//     let currentIsPcLayout;
//     if (windowWidth <1215 || windowWidth < windowHeight){
//         currentIsPcLayout=false;
//     }else{
//         currentIsPcLayout=true;
//     }

//     if (currentIsPcLayout!= IsPcLayout) {
//         IsPcLayout = currentIsPcLayout;
//         hideAll();

//         var box2Buttons = document.querySelectorAll('.slide_butt2');

//         if (currentIsPcLayout) {
//             box2Buttons.forEach(function (button) {
//                 button.setAttribute("onclick", "slideRectangle2()");
//             });
//         }
//         else{
//             box2Buttons.forEach(function (button) {
//                 button.setAttribute("onclick", "hideAll()");
//             });
//         }
//     }
// }