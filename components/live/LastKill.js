import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LastKill(props) {
  const {
    killer, killed, distance, weapon,
  } = props;
  const [timeStamp, setTimeStamp] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => setTimeStamp((ts) => ts + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { t } = useTranslation('common');

  return (
    <div className="card bg-darker my-2 text-center shadow">
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-2">
        <span className="hide-overflow" style={{ fontFamily: '"Montserrat", sans-serif' }}>{killer}</span>
        <span
          className="text-primary py-2 py-sm-0"
          style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fontSize: 25,
          }}
        >
          killed
        </span>
        <span style={{ fontFamily: '"Montserrat", sans-serif' }}>{killed}</span>
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
        <small>
          <i className="fa fa-clock" />
          {t('live.lastKills.time', { timeStamp })}
        </small>
        <small>
          <i className="fa fa-people-arrows" />
          {t('live.lastKills.distance', { distance })}
        </small>
        <small>
          <i className="fa fa-skull-crossbones" />
          {t('live.lastKills.weapon', { weapon })}
        </small>
      </div>
    </div>
  );
}

export default LastKill;
