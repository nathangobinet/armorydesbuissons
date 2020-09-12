import clientSideLang from 'next-translate/clientSideLang';
import Router from 'next-translate/Router';

export function setLanguage(language) {
  const path = window.location.pathname;
  const possibleLangPath = `/${clientSideLang()}`;
  const pathWithoutLang = path.replace(possibleLangPath, '');
  Router.pushI18n({ url: pathWithoutLang, options: { lang: language } });
}

export function getLanguage() {
  return clientSideLang();
}
