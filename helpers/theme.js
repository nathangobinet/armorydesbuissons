const DARK_MODE_CLASS = 'dark-mode';
const LIGHT_MODE_CLASS = 'light-mode';

export function isDarkMode() {
  return localStorage.getItem('dark') === 'true';
}

export function setDarkMode(darkModeWanted) {
  const [body] = document.getElementsByTagName('body');
  if (darkModeWanted) {
    body.classList.remove(LIGHT_MODE_CLASS);
    body.classList.add(DARK_MODE_CLASS);
    localStorage.setItem('dark', 'true');
  } else {
    body.classList.remove(DARK_MODE_CLASS);
    body.classList.add(LIGHT_MODE_CLASS);
    localStorage.setItem('dark', 'false');
  }
}
