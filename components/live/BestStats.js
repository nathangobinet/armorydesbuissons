import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Player from './Player';
import useFetch from '../../helpers/useFetch';

const PERIODS = {
  DAY: 'day',
  SEASON: 'season',
  ALLTIME: 'all',
};

function StatCard({
  title, logo, player, number, text,
}) {
  return (
    <div className="col-sm-6 pb-3 pb-sm-0">
      <div className="card bg-darker">
        <h5 className="text-accent">{title}</h5>
        <div className="text-center py-5">
          <div className="text-primary mb-3"><i className={`fas ${logo} fa-5x`} /></div>
          <div style={{ fontFamily: '"Montserrat", sans-serif' }}>{player}</div>
        </div>
        <div className="text-center">
          <span className="text-accent" style={{ fontSize: 45, fontWeight: 600, fontFamily: '"Montserrat", sans-serif' }}>{number}</span>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default function BestStats() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState(PERIODS.DAY);
  const result = useFetch('/api/top', undefined, { period });

  const killsCard = (result && result.kill) ? {
    title: t('common:live.bestStats.topKills'), logo: 'fa-skull', player: <Player name={result.kill.lastPseudo} id={result.kill.id} />, number: result.kill.nbKills, text: t('live.bestStats.kills'),
  } : {
    title: t('common:live.bestStats.topKills'), logo: 'fa-skull', player: 'N/A', number: 'N/A', text: t('live.bestStats.kills'),
  };

  const ratioCard = (result && result.ratio) ? {
    title: t('common:live.bestStats.topRatio'), logo: 'fa-percentage', player: <Player name={result.ratio.lastPseudo} id={result.ratio.id} />, number: result.ratio.ratio.toFixed(2), text: t('live.bestStats.ratio'),
  } : {
    title: t('common:live.bestStats.topRatio'), logo: 'fa-percentage', player: 'N/A', number: 'N/A', text: t('live.bestStats.ratio'),
  };

  return (
    <div className="col-xl-5 py-2">
      <div className="card card-primary">
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
          <h4 className="text-white pb-2 pb-sm-0">{t('common:live.bestStats.title')}</h4>
          <div className="nav-pills pills-white d-flex flex-row align-items-center justify-content-between">
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.DAY) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.DAY)}
              onKeyPress={() => setPeriod(PERIODS.DAY)}
            >
              {t('common:live.bestStats.day')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.SEASON) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.SEASON)}
              onKeyPress={() => setPeriod(PERIODS.SEASON)}
            >
              {t('common:live.bestStats.season')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.ALLTIME) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.ALLTIME)}
              onKeyPress={() => setPeriod(PERIODS.ALLTIME)}
            >
              {t('common:live.bestStats.allTime')}
            </span>
          </div>
        </div>
        <div className="row">
          <StatCard
            title={killsCard.title}
            logo={killsCard.logo}
            player={killsCard.player}
            number={killsCard.number}
            text={killsCard.text}
          />
          <StatCard
            title={ratioCard.title}
            logo={ratioCard.logo}
            player={ratioCard.player}
            number={ratioCard.number}
            text={ratioCard.text}
          />
        </div>
      </div>
    </div>
  );
}
