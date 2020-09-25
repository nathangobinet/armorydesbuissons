/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import { Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../styles/Player.module.css';
import NumberPresentation from './NumberPresentation';

function CurrentRank({ rank }) {
  const { t } = useTranslation();
  const ranks = {
    BRONZE: 'rank_bronze.png',
    SILVER: 'rank_silver.png',
    GOLD: 'rank_gold.png',
    PLATINIUM: 'rank_platinium.png',
    DIAMOND: 'rank_diamond.png',
    TOP10: 'rank_top10.png',
  };

  const unranked = 'rank_unranked.png';

  return (
    <div className="h-100 d-flex flex-column">
      <div className="card shadow bg-darker h-100 d-flex flex-column justify-content-between">
        <h3 className="mb-3">{t('player:ranking.title2')}</h3>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between justify-content-sm-around mb-4">
          <div className="mb-3 mb-sm-0 mr-0 mr-sm-2" style={{ width: '50%' }}>
            <img
              style={{ maxHeight: 158 }}
              className="img-fluid"
              src={require(`../../public/images/ranks/${rank ? ranks[rank.division] : unranked}`)}
              alt="rank"
            />
          </div>
          <div>
            <div style={{ fontWeight: 600, lineHeight: 1, fontSize: 22 }}>{t('player:ranking.points')}</div>
            <div
              className={styles['text-gr-primary']}
              style={{
                fontFamily: '"Montserrat", sans-serif', fontSize: '4.5rem', fontWeight: 600, lineHeight: 0.85,
              }}
            >
              {rank ? Math.trunc(rank.score) : t('player:ranking.NA')}
            </div>
          </div>
        </div>
        <div
          style={{ overflowX: 'auto', overflowY: 'hidden' }}
          className="d-flex align-items-center justify-content-between pb-1"
        >
          <NumberPresentation title={t('player:ranking.num')} number={rank ? rank.rank : t('player:ranking.NA')} />
          <NumberPresentation title={t('player:ranking.total')} number={rank ? rank.total : t('player:ranking.NA')} />
          <NumberPresentation title={t('player:ranking.top')} number={rank ? `${Math.trunc(rank.top * 100)}%` : t('player:ranking.NA')} />
        </div>
      </div>
      <div className="mb-3 mb-md-0" />
    </div>

  );
}

function PreviousRank({ className, rank }) {
  const { t } = useTranslation();
  return (
    <div className={`card shadow bg-darker ${className}`}>
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }} className="d-flex align-items-center justify-content-between pb-1">
        <NumberPresentation title={t('player:ranking.season')} number={rank.season} />
        <NumberPresentation title={t('player:ranking.division')} number={rank.ligue ? rank.ligue : t('player:ranking.unranked')} />
        <NumberPresentation title={t('player:ranking.points')} number={rank.score ? Math.trunc(rank.score) : t('player:ranking.NA')} />
      </div>
    </div>
  );
}

export default function Ranking({ profileInfo }) {
  const { t } = useTranslation();
  return (
    <div className="card shadow card-primary">
      <h3 className="text-white mb-3">{t('player:ranking.title')}</h3>
      { profileInfo ? (
        <div className="row">
          <div className="col-md-5">
            <CurrentRank rank={profileInfo.ranks.current} />
          </div>
          <div className="col-md-7">
            <PreviousRank rank={profileInfo.ranks.passed[0]} />
            <PreviousRank rank={profileInfo.ranks.passed[1]} className="mt-2" />
            <PreviousRank rank={profileInfo.ranks.passed[2]} className="mt-2" />
          </div>
        </div>
      ) : (
        <div style={{ height: 337 }} className="d-flex align-items-center justify-content-center">
          <Spinner variant="white" animation="border" />
        </div>
      )}
    </div>
  );
}
