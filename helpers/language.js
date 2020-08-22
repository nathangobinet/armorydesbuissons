import { i18n } from './i18n';

export function storeLanguage(language) {
  localStorage.setItem('i18n', language);
}

export function setLanguage(language) {
  i18n.changeLanguage(language);
  storeLanguage(language);
}

export function getLanguage() {
  const storedLanguage = localStorage.getItem('i18n');
  return storedLanguage;
}
