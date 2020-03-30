let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('navbar').style.top = '0';
  } else {
    document.getElementById('navbar').style.top = '-56px';
  }
  prevScrollpos = currentScrollPos;
};
