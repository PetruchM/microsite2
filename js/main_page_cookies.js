function hideBanner() {
  document.getElementById('cookie-banner').style.display = 'none';
}

function openSettings() {
    document.querySelector('.cookies-details').style.display = 'block';
    document.querySelector('.coookies-links').style.display = 'block';
    document.querySelector('#cookie-banner').style.display = 'block';
    document.querySelector('#cookie-banner').classList.add('expanded');
    document.querySelector('#cookie-setting-button').textContent = 'Uložit předvolby';
    document.querySelector('#cookie-setting-button').onclick = saveSettings;
}

const toggle = document.getElementById('toggleSwitch');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
  });

function saveSettings() {
  console.log('Settings saved');
  hideBanner();
  if (toggle.classList.contains('active')) {
    acceptCookies();
    loadAnalytics();
  } else {
    declineCookies();
  }
}


function loadAnalytics() {
  const script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-JJ07GZQFYR";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-JJ07GZQFYR');
}

window.addEventListener('load', () => {
  const consent = getCookie('cookieConsent');
  if (consent === 'accepted') {
    loadAnalytics();
    hideBanner();
  }
  else if (consent === 'declined') {
    hideBanner(); 
  }else if (!consent) {
    document.getElementById('cookie-banner').style.display = 'flex';
  }
});