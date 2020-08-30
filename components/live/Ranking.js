import React, { useState } from 'react';

import { useTranslation } from '../../helpers/i18n';

import Table from './Table';
import TableInput from './TableInput';
import Player from './Player';
import useFetch from '../../helpers/useFetch';

export default function Ranking() {
  const { t } = useTranslation('common');
  const [filter, setFilter] = useState('');
  const players = useFetch('rank', [], { name: filter });

  const rows = players.map((p) => ({
    key: p.id,
    data: [
      p.rank, <Player name={p.lastPseudo} id={p.id} />,
      p.division, p.score, (p.top * 100).toFixed(2),
    ],
  }));

  const headers = [
    { text: t('live.ranking.headers.rank'), size: 2 },
    { text: t('live.ranking.headers.name'), size: 4 },
    { text: t('live.ranking.headers.division'), size: 2 },
    { text: t('live.ranking.headers.score'), size: 2 },
    { text: t('live.ranking.headers.top'), size: 2 },
  ];

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
