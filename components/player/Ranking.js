/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';

import { Spinner } from 'react-bootstrap';
import styles from '../../styles/Player.module.css';

function NumberPresentation({ number, title }) {
  return (
    <div className="px-2">
      <div className="text-accent" style={{ fontWeight: 600, lineHeight: 1, fontSize: 20 }}>{title}</div>
      <div style={{
        fontFamily: '"Montserrat", sans-serif', fontSize: 40, fontWeight: 600, lineHeight: 0.85, marginLeft: 1,
      }}
      >
        {number}
      </div>
    </div>
  );
}

function CurrentRank({ rank }) {
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
    <div className="card shadow bg-darker mb-3 mb-xl-0">
      <h3 className="mb-3">Current rank</h3>
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
          <div style={{ fontWeight: 600, lineHeight: 1, fontSize: 22 }}>Points</div>
          <div
            className={styles['text-gr-primary']}
            style={{
              fontFamily: '"Montserrat", sans-serif', fontSize: '4.5rem', fontWeight: 600, lineHeight: 0.85,
            }}
          >
            {rank ? Math.trunc(rank.score) : 'N/A'}
          </div>
        </div>
      </div>
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }} className="d-flex align-items-center justify-content-between pb-1">
        <NumberPresentation title="№" number={rank ? rank.rank : 'N/A'} />
        <NumberPresentation title="Total" number="1238" />
        <NumberPresentation title="Top" number={rank ? `${Math.trunc(rank.top * 100)}%` : 'N/A'} />
      </div>
    </div>
  );
}

function PreviousRank({ className }) {
  return (
    <div className={`card shadow bg-darker ${className}`}>
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }} className="d-flex align-items-center justify-content-between pb-1">
        <NumberPresentation title="Season" number="30" />
        <NumberPresentation title="Division" number="PLATINIUM" />
        <NumberPresentation title="Points" number="1200" />
      </div>
    </div>
  );
}

export default function Ranking({ profileInfo }) {
  return (
    <div className="card shadow card-primary">
      <h3 className="text-white mb-3">Ranking</h3>
      { profileInfo ? (
        <div className="row">
          <div className="col-md-5">
            <CurrentRank rank={profileInfo.ranks.current} />
          </div>
          <div className="col-md-7">
            <PreviousRank />
            <PreviousRank className="mt-2" />
            <PreviousRank className="mt-2" />
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
