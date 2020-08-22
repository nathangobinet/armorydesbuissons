import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import Table from './Table';
import Flag from '../Common/Flag';
import Time from './Time';
import Player from './Player';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (max) => Math.floor(Math.random() * max);

const flags = ['gb', 'fr', 'kr', 'be', 'ca', 'us'];
const names = [
  <Player name="[SWAT] Louis" />,
  <Player name=">-----»Matsuki«-----<" />,
  <Player name="Backary Baradji" />,
  <Player name="Johann Mallet" />,
  <Player name="kkonperson" />,
  <Player name="Jules Jerne" />,
  <Player name="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />,
];

const getRandomRow = () => ({
  key: uuid(),
  data: [<Flag country={getRandomElement(flags)} />, getRandomElement(names), getRandomNumber(200), getRandomNumber(200), <Time date="2020-07-16 13:50:20" />],
});

function OnlinePlayers() {
  const defaultRows = [...Array(8)].map(() => getRandomRow());
  const [rows, setRows] = useState(defaultRows);
  const { t } = useTranslation('common');
  const headers = [
    { text: t('live.onlinePlayers.headers.country'), size: 2 },
    { text: t('live.onlinePlayers.headers.name'), size: 4 },
    { text: t('live.onlinePlayers.headers.kills'), size: 2 },
    { text: t('live.onlinePlayers.headers.deaths'), size: 2 },
    { text: t('live.onlinePlayers.headers.timePlayed'), size: 2 },
  ];

  // Do not animate if the document is hidden
  const animatedList = (!document.hidden) ? rows : [];

  // Reprint the list if the document is print
  document.onvisibilitychange = () => { if (!document.hidden) setRows(rows); };

  // -------- Randomize data for tests

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((crtRows) => {
        crtRows.splice(Math.floor(Math.random() * crtRows.length), 1);
        crtRows.push(getRandomRow());
        return shuffle(crtRows);
      });
    }, 2000);
    return () => { clearInterval(interval); };
  }, []);

  // ------------ Randomize data for tests

  return (
    <div className="col-xl-7 py-2">
      <div className="card shadow">
        <h4 className="text-accent mb-4">{t('live.onlinePlayers.title')}</h4>
        <Table id="onlinePlayers" headers={headers} rows={animatedList} />
      </div>
    </div>
  );
}

export default OnlinePlayers;
