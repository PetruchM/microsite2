const delay = 100; // in milliseconds

document.addEventListener("DOMContentLoaded", function () {
    const introOverlay = document.querySelector(".intro-overlay");
    const introBars = document.querySelectorAll(".intro-bar");
    const introButton = document.querySelector(".intro-button");

    introButton.addEventListener("click", function () {
        console.log("clicked");
        // Hide intro overlay
        // introOverlay.style.opacity = 0;

        // Slide down intro bars one by one
        introBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = "translateY(-105%)";
            }, index * delay); // Adjust the delay as needed
        });

        // Hide intro button
        introButton.style.top = "-100px";
        // setTimeout(() => {
        //     introButton.style.top = "-100px";
        // }, introBars.length * delay / 4 + delay/2);

        // Allow scrolling after the transition is finished
        setTimeout(() => {
            document.body.classList.remove("no-overflow");
            introOverlay.style.display = "none";
        }, introBars.length * delay + 50);
    });
});
