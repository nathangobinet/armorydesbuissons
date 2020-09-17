import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import Table from './Table';
import TableInput from './TableInput';
import Player from './Player';
import useFetch from '../../helpers/useFetch';

const PERIODS = {
  DAY: 'day',
  SEASON: 'season',
  ALLTIME: 'all',
};

export default function Statistic() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState(PERIODS.DAY);
  const [filter, setFilter] = useState('');

  const players = useFetch('/api/stats', [], { name: filter, period });

  const rows = players.map((p) => ({
    key: p.id,
    data: [
      p.rank,
      <Player name={p.lastPseudo} id={p.id} />,
      p.nbKills,
      p.nbDeaths,
      p.ratio.toFixed(2),
      p.level,
    ],
  }));

  const headers = [
    { text: t('live:statistic.headers.rank'), size: 1 },
    { text: t('live:statistic.headers.name'), size: 3 },
    { text: t('live:statistic.headers.kills'), size: 2 },
    { text: t('live:statistic.headers.deaths'), size: 2 },
    { text: t('live:statistic.headers.ratio'), size: 2 },
    { text: t('live:statistic.headers.level'), size: 2 },
  ];

  return (
    <div className="col-xl-7 py-2">
      <div className="card shadow">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
          <h4 className="text-accent mb-0 mr-3">{t('live:statistic.title')}</h4>
          <div className="nav-pills pills-accent d-flex flex-row align-items-center justify-content-between py-md-0 py-3">
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.DAY) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.DAY)}
              onKeyPress={() => setPeriod(PERIODS.DAY)}
            >
              {t('live:statistic.day')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.SEASON) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.SEASON)}
              onKeyPress={() => setPeriod(PERIODS.SEASON)}
            >
              {t('live:statistic.season')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.ALLTIME) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.ALLTIME)}
              onKeyPress={() => setPeriod(PERIODS.ALLTIME)}
            >
              {t('live:statistic.allTime')}
            </span>
          </div>
          <TableInput setFilter={setFilter} />
        </div>
        <Table id="statistic" headers={headers} rows={rows} />
      </div>
    </div>
  );
}
