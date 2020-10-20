import clientSideLang from 'next-translate/clientSideLang';
import Router from 'next-translate/Router';

import i18nConfig from '../i18n.json';

function getDefaultLanguage() {
  const { allLanguages, defaultLanguage } = i18nConfig;
  const userLang = (navigator.language || navigator.userLanguage).substring(0, 2);
  if (allLanguages.includes(userLang)) return userLang;
  return defaultLanguage;
}

function storeLanguage(language) {
  localStorage.setItem('lang', language);
}

export function removeLangFromPath(path) {
  const clientLang = clientSideLang();
  if (clientLang === undefined) return undefined;
  const possibleLangPath = `/${clientLang}`;
  if (path === possibleLangPath) return '/';
  return path.replace(possibleLangPath, '');
}

export function setLanguage(language) {
  storeLanguage(language);
  const path = window.location.pathname + window.location.search;
  const pathWithoutLang = removeLangFromPath(path);
  if (pathWithoutLang === undefined) return;
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
