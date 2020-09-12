import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../helpers/i18n';

import Table from './Table';
import Flag from '../common/Flag';
import Time from './Time';
import Player from './Player';
import EVENTS from '../../helpers/liveEventList';

function getPrintedPlayer(players) {
  return players.map((player) => ({
    key: player.id,
    data: [
      <Flag country={player.country} />,
      <Player name={player.lastPseudo} id={player.id} />,
      player.nbKills,
      player.nbDeaths,
      <Time date={player.connexionDate} />,
    ],
  }));
}

function useSocket(socket) {
  const [players, setPlayers] = useState([]);
  const [, updateState] = useState();

  useEffect(() => {
    const onVisiChange = () => { updateState({}); };
    document.addEventListener('visibilitychange', onVisiChange);

    socket.on(EVENTS.INITIED, (initInfo) => {
      setPlayers(initInfo.players);
    });

    socket.on(EVENTS.KILL_ADDED, (_players) => {
      setPlayers(_players);
    });

    socket.on(EVENTS.PLAYER_ADDED, (_players) => {
      setPlayers(_players);
    });

    socket.on(EVENTS.PLAYER_REMOVED, (_players) => {
      setPlayers(_players);
    });

    return () => { document.removeEventListener('visibilitychange', onVisiChange); };
  }, []);

  return players;
}

let printedPlayer = [];

function OnlinePlayers({ socket }) {
  const players = useSocket(socket);
  const { t } = useTranslation('common');

  if (process.browser) {
    printedPlayer = (!document.hidden) ? getPrintedPlayer(players) : [];
  }

  const headers = [
    { text: t('live.onlinePlayers.headers.country'), size: 2 },
    { text: t('live.onlinePlayers.headers.name'), size: 4 },
    { text: t('live.onlinePlayers.headers.kills'), size: 2 },
    { text: t('live.onlinePlayers.headers.deaths'), size: 2 },
    { text: t('live.onlinePlayers.headers.timePlayed'), size: 2 },
  ];

  return (
    <div className="col-xl-7 py-2">
      <div className="card shadow">
        <h4 className="text-accent mb-4">{t('live.onlinePlayers.title')}</h4>
        <Table id="onlinePlayers" headers={headers} rows={printedPlayer} />
      </div>
    </div>
  );
}

export default OnlinePlayers;
