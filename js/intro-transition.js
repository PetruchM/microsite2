const delay = 100;

document.addEventListener("DOMContentLoaded", function () {
    // Select relevant elements from the DOM
    const introOverlay = document.querySelector(".intro-overlay2");
    const introButton = document.querySelector(".intro-button2");

    const carousel = document.getElementById("projectCarousel");
    const projectInfo = document.getElementById("info-section");

    // Function to create and animate the yellow circle
    function createYellowCircle(event) {
        // Create a new div for the yellow circle
        const circle = document.createElement("div");
        circle.classList.add("yellow-circle");
        document.body.appendChild(circle);

        // Get mouse position and calculate initial circle size and position
        const { clientX, clientY } = event;
        const circleSize = Math.max(window.innerWidth, window.innerHeight) * 2;
        const halfSize = circleSize / 2;

        // Set initial size and position of the circle
        circle.style.width = `${circleSize}px`;
        circle.style.height = `${circleSize}px`;
        circle.style.top = `${clientY - halfSize}px`;
        circle.style.left = `${clientX - halfSize}px`;

        // Animate the circle expansion
        setTimeout(() => {
            circle.style.transform = "scale(1)";
        }, 50);

        // Trigger the overlay transition and reveal content after circle expansion
        setTimeout(() => {
            // Shrink the circle to nothing
            circle.style.transform = "scale(0)";
            // Hide the overlay
            introOverlay.style.display = "none";
            // Allow scrolling again
            document.body.classList.remove("no-overflow");

            // Remove the circle from the DOM after shrinking
            setTimeout(() => {
                document.body.removeChild(circle);
            }, 500);
        }, 600);
    }

    // Add click event listener to the button
    introButton.addEventListener("click", function (event) {
        // Trigger the yellow circle creation function on button click
        createYellowCircle(event);
    });
});






// document.addEventListener("DOMContentLoaded", function () {
//     const introOverlay = document.querySelector(".intro-overlay2");
//     const introButton = document.querySelector(".intro-button2");
//     const introButtonClone = document.querySelector(".intro-button2-clone");

//     const carousel = document.getElementById("projectCarousel");
//     const projectInfo = document.getElementById("info-section");

//     carousel.style.display = "none";
//     projectInfo.style.display = "none";

//     introButton.addEventListener("click", function () {
//         carousel.style.display = "block";
//         projectInfo.style.display = "block";
//         introOverlay.style.pointerEvents = "none";
//         introButtonClone.classList.add("active");
//         setTimeout(() => {
//             introOverlay.classList.add("active");
//             setTimeout(() => {
//                 introOverlay.style.display = "none";
//             }, 300);
//             document.body.classList.remove("no-overflow");
//         }, 1500);
//     });
// });


//slide away intro

// introButton.addEventListener("click", function () {
//     carousel.style.display = "block";
//     projectInfo.style.display = "block";
//     introOverlay.style.transform = "translateY(-110%)";
//     introOverlay.style.pointerEvents = "none";
//     setTimeout(() => {
//         introOverlay.style.display = "none";
//         document.body.classList.remove("no-overflow");
//     }, 700);
// });


// stripes intro

// document.addEventListener("DOMContentLoaded", function () {
//     const introOverlay = document.querySelector(".intro-overlay1");
//     const introBars = document.querySelectorAll(".intro-bar1");
//     const introButton = document.querySelector(".intro-button1");

//     introButton.addEventListener("click", function () {
//         // Slide down intro bars one by one
//         introBars.forEach((bar, index) => {
//             setTimeout(() => {
//                 bar.style.transform = "translateY(-105%)";
//             }, index * delay); // Adjust the delay as needed
//         });

//         // Hide intro button
//         introButton.style.top = "-100px";
//         // setTimeout(() => {
//         //     introButton.style.top = "-100px";
//         // }, introBars.length * delay / 4 + delay/2);

//         // Allow scrolling after the transition is finished
//         setTimeout(() => {
//             document.body.classList.remove("no-overflow");
//             introOverlay.style.display = "none";
//         }, introBars.length * delay + 50);
//     });
// });
