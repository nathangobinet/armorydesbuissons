import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import InfoCard from './InfoCard';
import EVENTS from '../../helpers/liveEventList';
import useFetch from '../../helpers/useFetch';

function useSocket(socket) {
  const [playerNumber, setPlayerNumber] = useState(0);
  const [uniquePlayerNumber, setUniquePlayerNumber] = useState(0);
  const [killNumber, setKillNumber] = useState(0);

  useEffect(() => {
    if (socket !== false) {
      socket.on(EVENTS.INITIED, (initInfo) => {
        setPlayerNumber(initInfo.players.length);
        setUniquePlayerNumber(initInfo.nbUniquePlayers);
        setKillNumber(initInfo.nbKills);
      });

      socket.on(EVENTS.KILL_ADDED, (_players, _lastKills, _killNumber) => {
        setKillNumber(_killNumber);
      });

      socket.on(EVENTS.PLAYER_ADDED, (_players) => {
        setPlayerNumber(_players.length);
      });

      socket.on(EVENTS.PLAYER_REMOVED, (_players) => {
        setPlayerNumber(_players.length);
      });

      socket.on(EVENTS.UNIQUE_PLAYER_ADDED, (_uniquePlayerNumber) => {
        setUniquePlayerNumber(_uniquePlayerNumber);
      });
    }
  }, [socket]);

  return { playerNumber, uniquePlayerNumber, killNumber };
}

function InfoCards({ socket }) {
  const result = useFetch('/playerRanked', 0);
  const { playerNumber, uniquePlayerNumber, killNumber } = useSocket(socket);
  const { t } = useTranslation();

  return (
    <section className="py-2" id="info-cards">
      <div className="row">
        <InfoCard bg="card-primary" icon="fa-skull" number={killNumber} description={t('live:infoCards.kills')} />
        <InfoCard bg="card-accent" icon="fa-users" number={playerNumber} description={t('live:infoCards.player')} />
        <InfoCard bg="card-primary" icon="fa-user-clock" number={uniquePlayerNumber} description={t('live:infoCards.unique')} />
        <InfoCard bg="card-accent" icon="fa-medal" number={result} description={t('live:infoCards.ranked')} />
      </div>
    </section>
  );
}

export default InfoCards;
