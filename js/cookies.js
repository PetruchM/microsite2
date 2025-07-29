function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days*864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function acceptCookies() {
  setCookie('cookieConsent', 'accepted', 365);
  document.getElementById('cookie-banner').style.display = 'none';
  loadAnalytics();
}

function declineCookies() {
  setCookie('cookieConsent', 'declined', 365);
  document.getElementById('cookie-banner').style.display = 'none';
  loadAnalytics();
}

function openSettings() {
    document.querySelector('.cookies-details').style.display = 'block';
    document.querySelector('.coookies-links').style.display = 'block';
    document.querySelector('#cookie-banner').style.display = 'block';
}

function loadAnalytics() {
  const script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-S450HLZK61";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-S450HLZK61'); // nahraď svým GA ID
}

window.addEventListener('load', () => {
  const consent = getCookie('cookieConsent');
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (!consent) {
    document.getElementById('cookie-banner').style.display = 'block';
  }
});