import clientSideLang from 'next-translate/clientSideLang';

export function setLanguage(language) {

}

export function getLanguage() {
  return clientSideLang();
}
