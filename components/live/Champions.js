import React from 'react';

import useTranslation from 'next-translate/useTranslation';
import Player from './Player';
import styles from '../../styles/Live.module.css';
import useFetch from '../../helpers/useFetch';

function Champion({ season, player, rank }) {
  const { t } = useTranslation();

  return (
    <div className="card shadow bg-darker my-2 text-center text-sm-left">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <div className={`${styles['card-rank']} py-2 py-sm-0`}>
          <div>{t('common:live.champions.season')}</div>
          <div className="text-primary">{season}</div>
        </div>
        <div className="text-center py-2 py-sm-0">
          <div className="text-primary mb-1"><i className="fas fa-medal fa-2x" /></div>
          <div style={{ fontFamily: '"Montserrat", sans-serif' }}>{player}</div>
        </div>
        <div className={`${styles['card-rank']} py-2 py-sm-0`}>
          <div>{t('common:live.champions.rank')}</div>
          <div className="text-primary">{rank}</div>
        </div>
      </div>
    </div>
  );
}

export default function Champions() {
  const champions = useFetch('/api/champions', []);

  const { t } = useTranslation();

  return (
    <div className="col-xl-5 py-2">
      <div className="card card-accent shadow">
        <h4 className="text-white">{t('common:live.champions.title')}</h4>
        {champions.map((champion) => (
          <Champion
            key={champion.playerID + champion.season}
            season={champion.season}
            player={<Player name={champion.lastName} id={champion.playerID} />}
            rank={Math.round(champion.rank)}
          />
        ))}
      </div>
    </div>
  );
}
