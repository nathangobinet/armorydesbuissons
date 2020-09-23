import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from '../../styles/Player.module.css';
import NumberPresentation from './NumberPresentation';

function LevelPart({ levelInfo }) {
  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mb-4">
      <div className="mb-2 mb-sm-0">
        <svg viewBox="0 0 36 36" className={styles['circular-chart']}>
          <defs>
            <linearGradient id="primary-gr" gradientUnits="userSpaceOnUse" x1="-8.55%" y1="63.84%" x2="108.55%" y2="36.16%">
              <stop stopColor="#01AD84" />
              <stop offset=".953" stopColor="#00CB44" />
            </linearGradient>
          </defs>
          <path
            className={styles['circle-bg']}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={styles.circle}
            strokeDasharray={`${Math.trunc((levelInfo.xp / levelInfo.neededXp) * 100)}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="21.7" className={styles.percentage}>{levelInfo.level}</text>
        </svg>
      </div>
      <div>
        <div
          className={styles['text-gr-accent']}
          style={{
            fontFamily: '"Montserrat", sans-serif', fontSize: '4.5rem', fontWeight: 600, lineHeight: 0.9,
          }}
        >
          {`${Math.trunc((levelInfo.xp / levelInfo.neededXp) * 100)}%`}
        </div>
        <div style={{ fontWeight: 600, fontSize: 26 }}>{`${levelInfo.xp} / ${levelInfo.neededXp} `}</div>
      </div>
    </div>
  );
}

export default function Level({ profileInfo }) {
  if (!profileInfo) {
    return (
      <div style={{ height: 431 }} className="card bt-accent shadow mt-3 mt-xl-0">
        <div className="d-flex h-100 align-items-center justify-content-center">
          <Spinner variant="primary" animation="border" />
        </div>
      </div>

    );
  }
  return (
    <div className="card bt-accent shadow mt-3 mt-xl-0">
      <h3 className="mb-3">Level</h3>
      <LevelPart levelInfo={profileInfo.levelInfo} />
      <h3 className="mb-3">Stats</h3>
      <div
        style={{ overflowX: 'auto', overflowY: 'hidden' }}
        className="d-flex align-items-center justify-content-between pb-1"
      >
        <NumberPresentation title="№" number={profileInfo.levelInfo.rank} />
        <NumberPresentation title="Total" number={profileInfo.levelInfo.total} />
        <NumberPresentation title="Top" number={`${((profileInfo.levelInfo.rank / profileInfo.levelInfo.total) * 100).toFixed(1)}%`} />
      </div>
    </div>
  );
}
