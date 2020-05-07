const animationIn = 'fadeIn';
const animationOut = 'fadeOut';

// HTML id of ranks
const ranks = [
  'rank-top10',
  'rank-diamond',
  'rank-platinium',
];

let activeRank = 0;

const btnSwitchLeft = document.getElementById('switch-rank-left');
const btnSwitchRight = document.getElementById('switch-rank-right');


function animateRanks(elActiveRank, elNewRank, index) {
  const animeIn = animationIn + ((index === 1) ? 'Left' : 'Right');
  const animeOut = animationOut + ((index === 1) ? 'Right' : 'Left');

  // Fade out the active rank then fade in the new rank
  elActiveRank.addEventListener('animationend', function hide(hideEvent) {
    hideEvent.target.classList.add('d-none');
    hideEvent.target.classList.remove(animeOut);
    hideEvent.target.removeEventListener('animationend', hide);

    elNewRank.classList.remove('d-none');
    elNewRank.addEventListener('animationend', function show(showEvent) {
      showEvent.target.classList.remove(animeIn);
      showEvent.target.removeEventListener('animationend', show);
    });
    elNewRank.classList.add(animeIn);
  });
  elActiveRank.classList.add(animeOut);
}

function switchRank(index) {
  let newRank;
  if (activeRank === 0 && index === -1) newRank = (ranks.length - 1);
  else if (activeRank === (ranks.length - 1) && index === 1) newRank = 0;
  else newRank = activeRank + index;

  const elActiveRank = document.getElementById(ranks[activeRank]);
  const elNewRank = document.getElementById(ranks[newRank]);

  animateRanks(elActiveRank, elNewRank, index);

  activeRank = newRank;
}


if (btnSwitchLeft && btnSwitchRight) {
  btnSwitchLeft.addEventListener('click', () => switchRank(-1));
  btnSwitchRight.addEventListener('click', () => switchRank(1));
}
