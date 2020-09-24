/* eslint-disable no-param-reassign */
function displayNav(currentScrollPos, prevScrollpos) {
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('navbar').style.top = '0';
  } else if (currentScrollPos > 0) {
    document.getElementById('navbar').style.top = '-66px';
  }
  return currentScrollPos;
}

function setNavBackground(currentScrollPos, shouldHandle) {
  if (currentScrollPos < 200 && shouldHandle) {
    document.getElementById('navbar').style.backgroundColor = 'transparent';
  } else {
    document.getElementById('navbar').style.backgroundColor = '#2B2B2B';
  }
}

export function handleScroll(shouldHandle) {
  if (shouldHandle) {
    let prevScrollpos = window.pageYOffset;

    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      setNavBackground(currentScrollPos, shouldHandle);
      prevScrollpos = displayNav(currentScrollPos, prevScrollpos);
    };
  } else {
    window.onscroll = null;
  }
}

export function handleToggle(isToggle, navRef, shouldHandle) {
  if (isToggle) {
    navRef.style.backgroundColor = '#2B2B2B';
  } else {
    const currentScrollPos = window.pageYOffset;
    setNavBackground(currentScrollPos, shouldHandle);
  }
}
