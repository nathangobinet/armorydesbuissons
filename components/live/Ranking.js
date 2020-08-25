import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useTranslation } from '../../helpers/i18n';

import Table from './Table';
import TableInput from './TableInput';
import Player from './Player';

export default function Ranking() {
  const { t } = useTranslation('common');
  const [filter, setFilter] = useState('');

  const headers = [
    { text: t('live.ranking.headers.rank'), size: 2 },
    { text: t('live.ranking.headers.name'), size: 4 },
    { text: t('live.ranking.headers.division'), size: 2 },
    { text: t('live.ranking.headers.score'), size: 2 },
    { text: t('live.ranking.headers.top'), size: 2 },
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
    .map((e, i) => ({ key: uuid(), data: [i, getRandomElement(names), 'TOP10', '25', '0.1%'] }))
    .filter((row) => row.data[1].props.name.includes(filter));

  /**
   * Random gen
  */

  return (
    <div className="col-xl-7 py-2">
      <div className="card shadow">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="text-accent mb-0 mr-3">{t('live.ranking.title')}</h4>
          <TableInput setFilter={setFilter} />
        </div>
        <Table id="ranking" headers={headers} rows={rows} />
      </div>
    </div>
  );
}
