import 'bootstrap';
import './fullpage';

function getToogleEl(event) {
  const selectId = event.currentTarget.getAttribute('data-toggle');
  return document.getElementById(selectId);
}

function toogleNavSelect(select) {
  select.classList.remove('nav-select-hide');
  select.parentNode.classList.add('nav-select-border');
}

function unToogleNavSelect(select) {
  select.classList.add('nav-select-hide');
  select.parentNode.classList.remove('nav-select-border');
}

function handleClickNavSelect(event) {
  const select = getToogleEl(event);
  if (select.classList.contains('nav-select-hide')) {
    toogleNavSelect(select);
  } else {
    unToogleNavSelect(select);
  }
}

function handleBlurNavSelect(event) {
  const select = getToogleEl(event);
  if (event.relatedTarget && event.relatedTarget.parentNode === select) {
    event.relatedTarget.addEventListener('blur', (newEvent) => handleBlurNavSelect({
      relatedTarget: newEvent.relatedTarget,
      currentTarget: select.previousElementSibling.firstElementChild,
    }));
  } else {
    unToogleNavSelect(select);
  }
}

document.getElementById('toggle-language-select').addEventListener('click', handleClickNavSelect);
document.getElementById('toggle-theme-select').addEventListener('click', handleClickNavSelect);

document.getElementById('toggle-theme-select').addEventListener('blur', handleBlurNavSelect);
document.getElementById('toggle-language-select').addEventListener('blur', handleBlurNavSelect);
