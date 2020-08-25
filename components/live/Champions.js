import React from 'react';

import { useTranslation } from '../../helpers/i18n';
import Player from './Player';
import styles from '../../styles/Live.module.css';

function Champion({ season, player, rank }) {
  const { t } = useTranslation('common');

  return (
    <div className="card shadow bg-darker my-2 text-center text-sm-left">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <div className={`${styles['card-rank']} py-2 py-sm-0`}>
          <div>{t('live.champions.season')}</div>
          <div className="text-primary">{season}</div>
        </div>
        <div className="text-center py-2 py-sm-0">
          <div className="text-primary mb-1"><i className="fas fa-medal fa-2x" /></div>
          <div style={{ fontFamily: '"Montserrat", sans-serif' }}>{player}</div>
        </div>
        <div className={`${styles['card-rank']} py-2 py-sm-0`}>
          <div>{t('live.champions.rank')}</div>
          <div className="text-primary">{rank}</div>
        </div>
      </div>
    </div>
  );
}

export default function Champions() {
  const champions = [
    { season: 22, player: <Player name="[SWAT] Michel" />, rank: 1950 },
    { season: 21, player: <Player name="[SWAT] Jean" />, rank: 1850 },
    { season: 20, player: <Player name="[SWAT] Eude" />, rank: 1970 },
  ];

  const { t } = useTranslation('common');

  return (
    <div className="col-xl-5 py-2">
      <div className="card card-accent shadow">
        <h4 className="text-white">{t('live.champions.title')}</h4>
        {champions.map((champion) => (
          <Champion
            key={champion.player + champion.season}
            season={champion.season}
            player={champion.player}
            rank={champion.rank}
          />
        ))}
      </div>
    </div>
  );
}
