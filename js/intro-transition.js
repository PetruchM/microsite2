const delay = 100; // in milliseconds

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

document.addEventListener("DOMContentLoaded", function () {
    const introOverlay = document.querySelector(".intro-overlay2");
    const introButton = document.querySelector(".intro-button2");

    const carousel = document.getElementById("projectCarousel");
    const projectInfo = document.getElementById("info-section");

    carousel.style.display = "none";
    projectInfo.style.display = "none";

    introButton.addEventListener("click", function () {
        carousel.style.display = "block";
        projectInfo.style.display = "block";
        introOverlay.style.transform = "translateY(-110%)";
        introOverlay.style.pointerEvents = "none";
        setTimeout(() => {
            introOverlay.style.display = "none";
            document.body.classList.remove("no-overflow");
        }, 700);
    });
});
