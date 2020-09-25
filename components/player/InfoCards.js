/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next-translate/Link';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

import useFetch from '../../helpers/useFetch';
import styles from '../../styles/Player.module.css';
import DynamicInput from '../common/DynamicInput';

function InfoCard(props) {
  const {
    title, logo, children, color,
  } = props;
  return (
    <div className="col-lg-4">
      <div className={`card bt-${color} shadow my-2 ${styles['card-height']}`}>
        <h3 className="mb-4">{title}</h3>
        <div className="d-flex flex-column flex-sm-row justify-content-between justify-content-lg-around align-items-center">
          <i className={`fas fa-${logo} ${styles[`text-gr-${color}`]} fa-5x mb-3 mb-sm-0 mr-3`} />
          <div className={`text-center text-sm-left ${styles['card-width']}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InfoCards({ profileInfo }) {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const players = useFetch('/api/playersByName', undefined, { name: searchInput }, false);

  const SearchResult = () => {
    if (searchInput === '') return t('player:infoCards.searchPlayer.waitSearch');
    if (players.length === 0) return t('player:infoCards.searchPlayer.noPlayerFound');
    return players.map(
      (p) => <Link key={p.playerId} href={`/p/${p.playerId}`}><a className={styles.link}>{p.lastName}</a></Link>,
    ).reduce((prev, curr) => [prev, ', ', curr]);
  };

  const ProfileInformation = () => {
    if (!profileInfo) return <div className="text-center"><Spinner animation="border" variant="primary" /></div>;
    if (profileInfo.isItsProfile) {
      return (
        <div>
          {t('player:infoCards.profileInfo.isItsProfile')}
          {' '}
          <i className="fas fa-lock" />
          .
        </div>
      );
    }
    return (
      t('player:infoCards.profileInfo.isNotItsProfile')
    );
  };

  const ProfileOf = () => {
    if (!profileInfo) return <div className="text-center"><Spinner animation="border" variant="primary" /></div>;
    return (
      <div style={{ fontSize: 36, fontWeight: 600, fontFamily: '"Montserrat", sans-serif' }}>
        { profileInfo ? profileInfo.lastName : <Spinner animation="border" variant="white" />}
      </div>
    );
  };

  return (
    <section id="info-card" className="mt-3">
      <div className="row">
        <InfoCard logo="user" title={t('player:infoCards.profileOf.title')} color="primary">
          <ProfileOf />
        </InfoCard>
        <InfoCard title={t('player:infoCards.profileInfo.title')} logo="lock" color="accent">
          <ProfileInformation />
        </InfoCard>
        <InfoCard title={t('player:infoCards.searchPlayer.title')} logo="search" color="primary">
          <DynamicInput className="mb-2 mx-auto" setFilter={setSearchInput} />
          <div style={{ whiteSpace: 'nowrap', overflowX: 'auto' }} className="text-center pb-1">
            <SearchResult />
          </div>
        </InfoCard>
      </div>
    </section>
  );
}
