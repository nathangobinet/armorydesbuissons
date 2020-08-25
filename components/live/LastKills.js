import React, { useState, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { useTranslation } from '../../helpers/i18n';
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
    distance: lastKill.distance,
    weapon: lastKill.arme,
  }));
}

function useSocket(socket) {
  const [lastKills, setLastKills] = useState([]);
  const [, updateState] = useState();

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      updateState({});
    });

    socket.on(EVENTS.KILL_ADDED, (_players, _lastKills) => {
      setLastKills(_lastKills);
    });

    socket.on(EVENTS.INITIED, (initInfo) => {
      setLastKills(initInfo.lastKills);
    });
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
        <h4 className="text-white mb-3">{t('live.lastKills.title')}</h4>
        {
        transitions.map(({ key, item, props }) => (
          <animated.div key={key} style={props}>
            <LastKill
              killer={item.killer}
              killed={item.killed}
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
