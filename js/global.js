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


//cookies functioning for now
function acceptCookies() {
    //na 1 rok
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = "cookie_consent=true; expires=" + date.toUTCString() + "; path=/";

    // schovej banner
    document.getElementById('cookie-banner').style.display = 'none';

    loadGoogleAnalytics();
}

if (document.cookie.includes('cookie_consent=true')) {
    document.getElementById('cookie-banner').style.display = 'none';
    loadGoogleAnalytics();
}

function loadGoogleAnalytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
        a=s.createElement(o), m=s.getElementsByTagName(o)[0];
        a.async=1; a.src=g; m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXXXXXX-Y', 'auto'); // Vojta mi musí dát svůj kód
    ga('send', 'pageview');
}