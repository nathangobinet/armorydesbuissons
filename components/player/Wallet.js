/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next-translate/Link';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import acSvg from '../../public/svgs/icons/ac-round.svg';
import styles from '../../styles/Player.module.css';
import Lock from './Lock';

export default function Wallet({ profileInfo }) {
  const { t } = useTranslation();
  return (
    <div className="col-xl-4">
      <div className="card bt-primary shadow mt-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3>{t('player:wallet.title')}</h3>
          <Lock id="wallet" />
        </div>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mb-3 mb-sm-5">
          <div className="mb-1 mb-sm-0">
            <img width="165" className="img-fluid" src={acSvg} alt="Armory Coins" />
          </div>
          <div
            style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 72, fontWeight: 600 }}
            className={styles['text-gr-primary']}
          >
            {profileInfo.ac}
          </div>
        </div>
        <Link href="/shop#shop">
          <a className="btn btn-block btn-primary">{t('player:wallet.btn')}</a>
        </Link>
      </div>
    </div>
  );
}
