import React, { useRef } from 'react';

import { displayPopper } from './PlayerPopper';
import styles from '../../styles/Live.module.css';

export default function Player({ id, name }) {
  const playerRef = useRef();
  return (
    <button
      ref={playerRef}
      type="button"
      className={styles.playerButton}
      onClick={() => displayPopper(playerRef, id, name)}
    >
      {name}
    </button>
  );
}
