import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import Table from './Table';
import TableInput from './TableInput';
import Player from './Player';

const PERIODS = {
  DAY: 'day',
  SEASON: 'season',
  ALLTIME: 'alltime',
};

export default function Statistic() {
  const { t } = useTranslation('common');
  const [period, setPeriod] = useState(PERIODS.DAY);
  const [filter, setFilter] = useState('');

  const headers = [
    { text: t('live.statistic.headers.rank'), size: 2 },
    { text: t('live.statistic.headers.name'), size: 4 },
    { text: t('live.statistic.headers.kills'), size: 2 },
    { text: t('live.statistic.headers.deaths'), size: 2 },
    { text: t('live.statistic.headers.ratio'), size: 2 },
  ];

  /**
   * Random gen
   */

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
  const names = [
    <Player name="[SWAT] Louis" />,
    <Player name=">-----»Matsuki«-----<" />,
    <Player name="Backary Baradji" />,
    <Player name="Johann Mallet" />,
    <Player name="kkonperson" />,
    <Player name="Jules Jerne" />,
    <Player name="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />,
  ];

  const rows = [...Array(8)]
    .map((e, i) => ({ key: uuid(), data: [i, getRandomElement(names), '50', '20', '2'] }))
    .filter((row) => row.data[1].props.name.includes(filter));

  /**
   * Random gen
   */

  return (
    <div className="col-xl-7 py-2">
      <div className="card shadow">
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
          <h4 className="text-accent mb-0 mr-3">{t('live.statistic.title')}</h4>
          <div className="nav-pills pills-accent d-flex flex-row align-items-center justify-content-between py-sm-0 py-3">
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.DAY) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.DAY)}
              onKeyPress={() => setPeriod(PERIODS.DAY)}
            >
              {t('live.statistic.day')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.SEASON) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.SEASON)}
              onKeyPress={() => setPeriod(PERIODS.SEASON)}
            >
              {t('live.statistic.season')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${(period === PERIODS.ALLTIME) ? 'active' : ''}`}
              onClick={() => setPeriod(PERIODS.ALLTIME)}
              onKeyPress={() => setPeriod(PERIODS.ALLTIME)}
            >
              {t('live.statistic.allTime')}
            </span>
          </div>
          <TableInput setFilter={setFilter} />
        </div>
        <Table id="statistic" headers={headers} rows={rows} />
      </div>
    </div>
  );
}
