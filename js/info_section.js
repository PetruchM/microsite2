const cardsNodeArr = document.querySelectorAll(".info-card");
const cards = Array.from(cardsNodeArr);
const allInfoText = document.getElementsByClassName("info-card-text");

function hideAllCards() {
    console.log("hide all cards");
    var overlay = document.getElementById("info-overlay");
    overlay.classList.remove("slide-down");

    var infoCardsHolder = document.getElementById("info-cards-container");
    infoCardsHolder.classList.remove("expand");

    cards.forEach(card => {
        card.classList.remove("slide-down");
        card.classList.remove("active");      //"active" atribute is used here just as empty atribute  
    });

    var allInfoText = document.getElementsByClassName("info-card-text");
    // toggle opacity class for all info text
    for (var i = 0; i < allInfoText.length; i++) {
        allInfoText[i].classList.remove("opacity1");
    }
}

function slideDownCard(cardIndex) {
    var card = cards[cardIndex]
    var otherCards = cards.filter((c, index) => index != cardIndex)
    if (card.classList.contains("active")) {
        hideAllCards();
        return;
    }
    hideAllCards();

    var overlay = document.getElementById("info-overlay");
    overlay.classList.add("slide-down");

    var infoCardsHolder = document.getElementById("info-cards-container");
    infoCardsHolder.classList.add("expand");

    card.classList.remove("slide-down");
    card.classList.add("active");
    otherCards.forEach(oCard => {
        oCard.classList.add("slide-down");
    });
    // toggle opacity class for all info text
    for (var i = 0; i < allInfoText.length; i++) {
        if (i == cardIndex) {
            allInfoText[i].classList.add("opacity1");
        }
        else {
            allInfoText[i].classList.remove("opacity1");
        }
    }
}

function slideDownCard1() {
    slideDownCard(0);
}

function slideDownCard2() {
    slideDownCard(1);
}

function slideDownCard3() {
    slideDownCard(2);
}







// ----------------- LEGACY ----------------- //
function slideDown() {
    var overlay = document.getElementById("info-overlay");
    overlay.classList.toggle("slide-down");

    var infoCardsHolder = document.getElementById("info-cards-container");
    infoCardsHolder.classList.toggle("expand");

    var card1 = document.getElementById("card1");
    var card2 = document.getElementById("card2");
    var card3 = document.getElementById("card3");

    card1.classList.toggle("slide-down");
    card2.classList.toggle("slide-down");
    card3.classList.toggle("slide-down");

    var allInfoText = document.getElementsByClassName("info-card-text");
    // toggle opacity class for all info text
    for (var i = 0; i < allInfoText.length; i++) {
        allInfoText[i].classList.toggle("opacity1");
    }
}