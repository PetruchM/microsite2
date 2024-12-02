document.addEventListener("DOMContentLoaded", function () {
    // scroll to top of the page
    window.scrollTo(0, 0);

    // Select relevant elements from the DOM
    const introOverlay = document.querySelector(".intro-overlay");
    const introButton = document.querySelector(".intro-button");

    // Function to create and animate the yellow circle
    function createYellowCircle(event) {
        // Create a new div for the yellow circle
        const circle = document.createElement("div");
        circle.classList.add("yellow-circle");
        document.body.appendChild(circle);

        // Get mouse position and calculate initial circle size and position
        const { clientX, clientY } = event;
        const circleSize = Math.max(window.innerWidth, window.innerHeight) * 2;

        // Set initial size and position of the circle
        circle.style.width = `${circleSize}px`;
        circle.style.height = `${circleSize}px`;
        circle.style.top = `${clientY - (circleSize / 2)}px`;
        circle.style.left = `${clientX - (circleSize / 2)}px`;

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
