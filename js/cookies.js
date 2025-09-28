function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days*864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function acceptCookies() {
  setCookie('cookieConsent', 'accepted', 365);
}

function declineCookies() {
  setCookie('cookieConsent', 'declined', 365);
}