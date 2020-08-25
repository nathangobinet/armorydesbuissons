import React, { useRef } from 'react';
import { createPopper } from '@popperjs/core';
import { playerState } from './PlayerPopper';

import styles from '../../styles/Live.module.css';

let popperInstance = null;

/**
 *  Use because the show function is trigered before the hide function
 *  when we click 2 times on player
 */
let doNotHide = false;

function create(target) {
  const tooltip = document.querySelector('#player-info-popper');
  popperInstance = createPopper(target, tooltip, {
    placement: (window.innerWidth) > 1100 ? 'right' : 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });
}

function destroy() {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

function hide(event) {
  const tooltip = document.querySelector('#player-info-popper');
  if (!event.path.includes(tooltip)) {
    if (!doNotHide) {
      document.removeEventListener('click', hide);
      playerState.setDisplayed(false);
      destroy();
    } else {
      doNotHide = false;
    }
  }
}

function displayPopper(playerRef, name) {
  if (playerState.displayed) doNotHide = true;
  playerState.setPlayerData({ name });
  playerState.setDisplayed(true);
  document.addEventListener('click', hide);
  create(playerRef.current);
}

export default function Player({ name }) {
  const playerRef = useRef();
  return (
    <button
      ref={playerRef}
      type="button"
      className={styles.playerButton}
      onClick={() => displayPopper(playerRef, name)}
    >
      {name}
    </button>
  );
}
