/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next-translate/Link';
import React, { useEffect, useState } from 'react';
import config from '../../helpers/config';

import styles from '../../styles/Player.module.css';
import Lock from './Lock';

function Points({ number }) {
  return (
    <div>
      <div style={{ fontWeight: 600, lineHeight: 1, fontSize: 20 }}>Points</div>
      <div
        className={styles['text-gr-primary']}
        style={{
          fontFamily: '"Montserrat", sans-serif', fontSize: 60, fontWeight: 600, lineHeight: 0.85, marginLeft: 1,
        }}
      >
        {number}
      </div>
    </div>
  );
}

function ResetContent({ rank }) {
  const [printedRank, setRank] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setRank(rank);
  }, []);

  const reqResetScore = async () => {
    const response = await fetch(`${config.httpserver}/api/resetRank`, { credentials: 'include' }).then((res) => res.json());
    if (response.success && response.result) {
      setRank('1000');
    } else setRank('Err');
    setConfirm(false);
  };

  return (
    <div className="card shadow">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3>Reset your score</h3>
        <Lock id="reset-score" />
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between justify-content-sm-around mb-4">
        <div className="mb-3 mb-sm-0 mr-0 mr-sm-4">
          <i className={`fas fa-retweet fa-6x ${styles['text-gr-primary']}`} />
        </div>
        <div style={{ maxWidth: 300 }}>
          <h4>Informations</h4>
          <p>
            This feature allows you to reset your points to 1000.
            {' '}
            The reset will be final. It can be used as many times as desired.
          </p>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mb-5">
        <Points number={printedRank} />
        <b className="py-2 py-sm-0">to</b>
        <Points number="1000" />
      </div>
      {
        confirm
          ? <button className="btn btn-block btn-primary" type="button" onClick={reqResetScore}>Confirm</button>
          : <button className="btn btn-block btn-primary" type="button" onClick={() => { setConfirm(true); }}>Reset my points</button>
      }

    </div>
  );
}

function VipRequired() {
  return (

    <div
      className="position-absolute "
      style={{
        backgroundColor: 'rgba(0,0,0,.8)',
        zIndex: 1,
        top: 0,
        bottom: 0,
        left: '15px',
        right: '15px',
        borderRadius: '0.8rem',
      }}
    >
      <div className="d-flex align-items-center justify-content-center h-100 mx-auto" style={{ width: 300 }}>
        <div className="text-center">
          <h3 className="text-white mb-3">You must be VIP to use this feature</h3>
          <Link href="shop#pricing">
            <a className="btn btn-block btn-primary">Help us by becoming VIP</a>
          </Link>
        </div>
      </div>
    </div>

  );
}

export default function ResetScore({ profileInfo }) {
  if (profileInfo.isVip) return <ResetContent rank={profileInfo.rank} />;
  return (
    <div>
      <VipRequired />
      <ResetContent rank={profileInfo.rank} />
    </div>
  );
}
