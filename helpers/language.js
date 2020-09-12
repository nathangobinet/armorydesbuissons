import clientSideLang from 'next-translate/clientSideLang';
import Router from 'next-translate/Router';

function getDefaultLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.substring(0, 2);
}

function storeLanguage(language) {
  localStorage.setItem('lang', language);
}

export function setLanguage(language) {
  storeLanguage(language);
  const path = window.location.pathname;
  const possibleLangPath = `/${clientSideLang()}`;
  const pathWithoutLang = path.replace(possibleLangPath, '');
  Router.pushI18n({ url: pathWithoutLang, options: { lang: language } });
}

export function initLanguage() {
  const storedLanguage = localStorage.getItem('lang');
  if (storedLanguage) setLanguage(storedLanguage);
  else {
    setLanguage(getDefaultLanguage());
  }
}

export function getLanguage() {
  return clientSideLang();
}
