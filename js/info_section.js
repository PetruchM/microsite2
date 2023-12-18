function slideDown() {
    var overlay = document.getElementById("info-overlay");
    overlay.classList.toggle("slide-down");

    var allInfoText = document.getElementsByClassName("info-card-text");
    // toggle opacity class for all info text
    for (var i = 0; i < allInfoText.length; i++) {
        allInfoText[i].classList.toggle("opacity1");
    }
}