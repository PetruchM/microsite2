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
}

function openSettings() {
    document.querySelector('.cookies-details').style.display = 'block';
    document.querySelector('.coookies-links').style.display = 'block';
    document.querySelector('#cookie-banner').style.display = 'block';
    document.querySelector('#cookie-setting-button').textContent = 'Uložit předvolby';
    document.querySelector('#cookie-setting-button').onclick = saveSettings;
}

const toggle = document.getElementById('toggleSwitch');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
  });

function saveSettings() {
  console.log('Settings saved');
  if (toggle.classList.contains('active')) {
    acceptCookies();
  } else {
    declineCookies();
  }
}

function loadAnalytics() {
  const script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
}
window.addEventListener('load', () => {
  const consent = getCookie('cookieConsent');
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (!consent) {
    document.getElementById('cookie-banner').style.display = 'flex';
  }
});
