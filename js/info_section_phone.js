const cardsNodeArrPhone = document.querySelectorAll(".info-card-phone");
const cardsPhone = Array.from(cardsNodeArrPhone);
const allInfoTextPhone = document.getElementsByClassName("info-card-text-phone");

var currShownCardPhone = -1;

function slideDownCard1Phone()
{
    if (currShownCardPhone != 0 && currShownCardPhone != -1)
    {
        hideAllPhoneCards();
        currShownCardPhone = 0;
    }
    else if (currShownCardPhone == -1)
    {
        currShownCardPhone = 0;
    }
    else if (currShownCardPhone == 0)
    {
        currShownCardPhone = -1;
    }

    var card = cards[0];
    var card_one_section = document.getElementById("card-section-one");
    var overlay = card_one_section.getElementsByClassName("info-overlay-phone")[0];
    var text = allInfoTextPhone[0];

    slideDownCardPhone(card_one_section, overlay, text);
}

function slideDownCard2Phone()
{
    if (currShownCardPhone != 1 && currShownCardPhone != -1)
    {
        hideAllPhoneCards();
        currShownCardPhone = 1;
    }
    else if (currShownCardPhone == -1)
    {
        currShownCardPhone = 1;
    }
    else if (currShownCardPhone == 1)
    {
        currShownCardPhone = -1;
    }

    var card = cards[1];
    var card_two_section = document.getElementById("card-section-two");
    var overlay = card_two_section.getElementsByClassName("info-overlay-phone")[0];
    var text = allInfoTextPhone[1];

    slideDownCardPhone(card_two_section, overlay, text);
}

function slideDownCard3Phone()
{
    if (currShownCardPhone != 2 && currShownCardPhone != -1)
    {
        hideAllPhoneCards();
        currShownCardPhone = 2;
    }
    else if (currShownCardPhone == -1)
    {
        currShownCardPhone = 2;
    }
    else if (currShownCardPhone == 2)
    {
        currShownCardPhone = -1;
    }

    var card = cards[2];
    var card_three_section = document.getElementById("card-section-three");
    var overlay = card_three_section.getElementsByClassName("info-overlay-phone")[0];
    var text = allInfoTextPhone[2];

    slideDownCardPhone(card_three_section, overlay, text);
}

function slideDownCardPhone(card_section, overlay, text)
{
    card_section.classList.toggle("active");
    overlay.classList.toggle("slide-down");

    text.classList.toggle("opacity1");
}

function hideAllPhoneCards()
{
    var card_one_section = document.getElementById("card-section-one");
    var card_two_section = document.getElementById("card-section-two");
    var card_three_section = document.getElementById("card-section-three");

    var overlay_one = card_one_section.getElementsByClassName("info-overlay-phone")[0];
    var overlay_two = card_two_section.getElementsByClassName("info-overlay-phone")[0];
    var overlay_three = card_three_section.getElementsByClassName("info-overlay-phone")[0];

    var text_one = allInfoTextPhone[0];
    var text_two = allInfoTextPhone[1];
    var text_three = allInfoTextPhone[2];

    card_one_section.classList.remove("active");
    card_two_section.classList.remove("active");
    card_three_section.classList.remove("active");

    overlay_one.classList.remove("slide-down");
    overlay_two.classList.remove("slide-down");
    overlay_three.classList.remove("slide-down");

    text_one.classList.remove("opacity1");
    text_two.classList.remove("opacity1");
    text_three.classList.remove("opacity1");
}