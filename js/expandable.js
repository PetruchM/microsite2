function toggleAdditionalText(button) {
    var container = button.parentNode;
    var additionalText = container.querySelector('.additional-text');
    additionalText.classList.toggle('show');
}