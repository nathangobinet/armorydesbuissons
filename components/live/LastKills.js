import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useTransition, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';

import LastKill from './LastKill';
import Player from './Player';

const defaultKills = [
  {
    id: uuid(), killer: <Player name="[SWAT] Louis" />, killed: <Player name="[SWAT] Michel" />, distance: 15, weapon: 'Zafir 7.62',
  }, {
    id: uuid(), killer: <Player name="[SWAT] Michel" />, killed: <Player name="[SWAT] Louis" />, distance: 15, weapon: 'Zafir 7.62',
  }, {
    id: uuid(), killer: <Player name="[SWAT] Louisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />, killed: <Player name="[SWAT] Michelaaaaaaaaaaaaaaaaaaaa" />, distance: 15, weapon: 'Zafir 7.62',
  },
];

function setRandomKill(setKills) {
  const interval = setInterval(() => {
    const index = 2;
    setKills((lastKills) => {
      const newKills = defaultKills.slice(index).map((kill) => ({ ...kill, id: uuid() }));
      const newAndOldKills = newKills.concat(lastKills);
      return newAndOldKills.slice(0, 3);
    });
  }, 2000);
  return () => {
    clearInterval(interval);
  };
}

function getKillHeight() {
  return window.innerWidth < 575 ? 240 : 130;
}

function LastKils() {
  const [kills, setKills] = useState(defaultKills);

  // Do not animate if the document is hidden
  const animatedList = (!document.hidden) ? kills : [];

  // Reprint the kills if the document is print
  document.onvisibilitychange = () => { if (!document.hidden) setKills(kills); };

  const transitions = useTransition(animatedList, (kill) => kill.id, {
    from: {
      height: 0, opacity: 0, transform: 'scale(0,0)',
    },
    enter: { height: getKillHeight(), opacity: 1, transform: 'scale(1,1)' },
    leave: { transform: 'scale(1,0)', height: 0, opacity: 0 },
  });

  // Simulate new requests
  useEffect(() => setRandomKill(setKills), []);

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

export default LastKils;
