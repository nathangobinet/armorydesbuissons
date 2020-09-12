import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import useTranslation from 'next-translate/useTranslation';
import { isDarkMode } from '../../helpers/theme';

import LastKill from './LastKill';
import Player from './Player';
import EVENTS from '../../helpers/liveEventList';

function getKillHeight() {
  const height = isDarkMode() ? 126 : 130;
  return window.innerWidth < 575 ? 172 : height;
}

function getPrintedLastKills(lastKills) {
  return lastKills.map((lastKill) => ({
    id: lastKill.id,
    killer: <Player name={lastKill.nomTueur} id={lastKill.idTueur} />,
    killed: <Player name={lastKill.nomTue} id={lastKill.idTue} />,
    date: lastKill.date,
    distance: lastKill.distance,
    weapon: lastKill.arme,
  }));
}

function useSocket(socket) {
  const [lastKills, setLastKills] = useState([]);
  const [, updateState] = useState();

  useEffect(() => {
    const onVisiChange = () => { updateState({}); };
    document.addEventListener('visibilitychange', onVisiChange);

    socket.on(EVENTS.KILL_ADDED, (_players, _lastKills) => {
      setLastKills(_lastKills);
    });

    socket.on(EVENTS.INITIED, (initInfo) => {
      setLastKills(initInfo.lastKills);
    });

    return () => { document.removeEventListener('visibilitychange', onVisiChange); };
  }, []);

  return lastKills;
}

let printLastKills = [];

function LastKills({ socket }) {
  const lastKills = useSocket(socket);

  if (process.browser) {
    printLastKills = (!document.hidden) ? getPrintedLastKills(lastKills) : [];
  }

  const transitions = process.browser ? useTransition(printLastKills, (kill) => kill.id, {
    from: {
      height: 0, opacity: 0, transform: 'scale(0,0)',
    },
    enter: { height: getKillHeight(), opacity: 1, transform: 'scale(1,1)' },
    leave: { transform: 'scale(1,0)', height: 0, opacity: 0 },
  }) : [];

  const { t } = useTranslation('common');

  return (
    <div className="col-xl-5 py-2">
      <div className="card card-accent shadow last-kill" style={{ maxHeight: '100%' }}>
        <h4 className="text-white mb-3">{t('common:live.lastKills.title')}</h4>
        {
        transitions.map(({ key, item, props }) => (
          <animated.div key={key} style={props}>
            <LastKill
              killer={item.killer}
              killed={item.killed}
              date={item.date}
              distance={item.distance}
              weapon={item.weapon}
            />
          </animated.div>
        ))
        }
      </div>
    </div>
  );
}

export default LastKills;
