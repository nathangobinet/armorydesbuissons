import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import useTranslation from 'next-translate/useTranslation';

import rankTop10 from '../../public/images/ranks/rank_top10.png';
import rankDiamond from '../../public/images/ranks/rank_diamond.png';
import rankPlatinium from '../../public/images/ranks/rank_platinium.png';
import rankGold from '../../public/images/ranks/rank_gold.png';
import rankSilver from '../../public/images/ranks/rank_silver.png';
import rankBronze from '../../public/images/ranks/rank_bronze.png';

import styles from '../../styles/About.module.css';

function RankImage({ image, league, description }) {
  return (
    <div className="px-3 position-relative mx-auto" style={{ maxWidth: '300px' }}>
      <div className="font-weight-bold text-accent mb-4">{league}</div>
      <img src={image} alt={league} width="200" className="img-fluid mb-4 drop-shadow" />
      <p className="mb-0">{description}</p>
    </div>
  );
}

function ImageHandler({ ranks, current, onChange }) {
  const [previousTab, setPreviousTab] = useState(current);

  let way;
  if (current - previousTab === ranks.length - 1) way = -1;
  else if (current - previousTab === -(ranks.length - 1)) way = 1;
  else way = (current - previousTab);

  const transitions = useTransition(ranks[current], (p) => p.league, {
    from: { opacity: 0, transform: `translate3d(${-way * 50}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: `translate3d(${way * 50}%,0,0)` },
  });
  if (current !== previousTab) setPreviousTab(current);

  return (
    <div className="d-flex justify-content-around align-items-center py-5">
      <button
        type="button"
        style={{ zIndex: 1 }}
        aria-label="Previous"
        className={`btn ${styles.chevron} flex-shrink-0`}
        onClick={() => onChange(-1)}
        onKeyPress={() => onChange(-1)}
      >
        <i className="fas fa-chevron-left" />
      </button>
      <div style={{ height: '300px', width: '50%', position: 'relative' }}>
        {
          transitions.map(({ item, props, key }) => (
            <animated.div
              key={key}
              style={{ ...props, position: 'absolute', width: '100%' }}
            >
              <RankImage
                image={item.image}
                league={item.league}
                description={item.description}
              />
            </animated.div>
          ))
        }
      </div>
      <button
        type="button"
        style={{ zIndex: 1 }}
        aria-label="Next"
        className={`btn ${styles.chevron} flex-shrink-0`}
        onClick={() => onChange(1)}
        onKeyPress={() => onChange(1)}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}

function Info({ icon, title, children }) {
  return (
    <div className="card my-3 shadow bg-lighter">
      <div className="d-flex flex-column flex-sm-row align-items-center ">
        <div className=" mr-0 ml-sm-3 mr-sm-4 ml-lg-4 mr-lg-5 flex-shrink-0 mb-sm-0 mb-3">
          <span className={`${styles['round-primary']} ${styles.bigger}`}><i className={`fas ${icon}`} /></span>
        </div>
        <div className="w-100 text-center text-sm-left flex-shrink-1">
          <h4 className="text-accent mb-2">{title}</h4>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Rank() {
  const { t } = useTranslation();

  const [current, setCurrent] = useState(0);

  const ranks = [
    { image: rankBronze, league: 'BRONZE', description: t('about:rank.league.bronze') },
    { image: rankSilver, league: 'SILVER', description: t('about:rank.league.silver') },
    { image: rankGold, league: 'GOLD', description: t('about:rank.league.gold') },
    { image: rankPlatinium, league: 'PLATINIUM', description: t('about:rank.league.platinium') },
    { image: rankDiamond, league: 'DIAMOND', description: t('about:rank.league.diamond') },
    { image: rankTop10, league: 'TOP 10', description: t('about:rank.league.top10') },
  ];

  const changeImage = (change) => {
    if ((change === 1) && (current + change >= ranks.length)) setCurrent(0);
    else if ((change === -1) && (current + change < 0)) setCurrent(ranks.length - 1);
    else setCurrent((crt) => crt + change);
  };

  return (
    <section id="rank" className="container py-5">
      <div className="text-center py-4">
        <div>
          <h1 className="text-accent mb-4">{t('about:rank.title')}</h1>
          <p>{t('about:rank.p1')}</p>
        </div>
        <ImageHandler ranks={ranks} current={current} onChange={changeImage} />
      </div>
      <div>
        <Info icon="fa-square-root-alt" title={t('about:rank.calculation.title')}>
          <p>{t('about:rank.calculation.p1')}</p>
          <pre className="mb-1">
            <code>
              <span className="font-weight-bolder">{t('about:rank.calculation.formula1')}</span>
              {' '}
              {t('about:rank.calculation.formula2')}
            </code>
          </pre>
        </Info>
        <Info icon="fa-sort-amount-down" title={t('about:rank.decrease.title')}>
          <p>{t('about:rank.decrease.p1')}</p>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="p-1">
              <div><b>Bronze</b></div>
              <div>0 point</div>
            </div>
            <div className="p-1">
              <div><b>Silver</b></div>
              <div>1 point</div>
            </div>
            <div className="p-1">
              <div><b>Gold</b></div>
              <div>2 points</div>
            </div>
            <div className="p-1">
              <div><b>Platinium</b></div>
              <div>3 points</div>
            </div>
            <div className="p-1">
              <div><b>Diamond</b></div>
              <div>5 points</div>
            </div>
            <div className="p-1">
              <div><b>TOP 10</b></div>
              <div>10 points</div>
            </div>
          </div>
        </Info>
        <Info icon="fa-people-arrows" title={t('about:rank.distance.title')}>
          <p>{t('about:rank.distance.p1')}</p>
          <pre className="mb-1">
            <code>
              <span className="font-weight-bolder">{t('about:rank.distance.formula1')}</span>
              {' '}
              {t('about:rank.distance.formula2')}
            </code>
          </pre>
        </Info>
        <Info icon="fa-calendar-week" title={t('about:rank.reset.title')}>
          <p>{t('about:rank.reset.p1')}</p>
          <p>{t('about:rank.reset.p2')}</p>
        </Info>
        <Info icon="fa-filter" title={t('about:rank.filter.title')}>
          <p>
            {t('about:rank.filter.p1')}
          </p>
        </Info>
        <Info icon="fa-trophy" title={t('about:rank.winner.title')}>
          <p>
            {t('about:rank.winner.p1')}
          </p>
        </Info>
      </div>
    </section>
  );
}
