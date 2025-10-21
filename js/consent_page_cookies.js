const toggle = document.getElementById('toggleSwitch');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
  });

function saveSettings(consent) {
  console.log('Settings saved');
  showCookieNotice('Nastavení cookies bylo uloženo.');
  if (consent === true) {
    acceptCookies();
    toggle.classList.add('active');
  } else if (consent === false) {
    declineCookies();
    deleteGACookies();
    toggle.classList.remove('active');
  } else {
    if (toggle.classList.contains('active')) {
        acceptCookies();
    } else {
        declineCookies();
        deleteGACookies();
    }
    }
}

function deleteGACookies() {
  const cookies = document.cookie.split("; ");
    for (const c of cookies) {
      const name = c.split("=")[0];
      if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }
    }
}


// Toast notification for cookie settings
let cookieToastTimer;
  function showCookieNotice(message, duration = 4000){
    const el = document.getElementById('cookie-toast');
    if (!el) return;

    clearTimeout(cookieToastTimer);

    el.textContent = message;
    el.classList.add('show');

    cookieToastTimer = setTimeout(() => {
      el.classList.remove('show');
    }, duration); 
  }

window.addEventListener('load', () => {
  const consent = getCookie('cookieConsent');
  if (consent === 'accepted') {
    toggle.classList.add('active');
  }
  else if (consent === 'declined') {
    toggle.classList.remove('active');
  }
});