import React from 'react';
import { Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

import NumberPresentation from './NumberPresentation';
import styles from '../../styles/Player.module.css';

function IconNumberPresentation(props) {
  const {
    className, icon, title, number,
  } = props;

  return (
    <div className={`d-flex align-items-center justify-content-between ${className}`}>
      <i style={{ fontSize: 65 }} className={`fas fa-${icon} ${styles['text-gr-primary']} mr-3`} />
      <NumberPresentation title={title} number={number} />
    </div>
  );
}

function StatCard(props) {
  const { t } = useTranslation();
  const {
    className, title, icon, stat,
  } = props;

  return (
    <div className={`col-xl-4 ${className}`}>
      <div className="card shadow bg-darker">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3>{title}</h3>
          <i className={`fas fa-${icon} fa-2x ml-2`} />
        </div>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-3">
          <IconNumberPresentation icon="plus-square" title={t('player:statistics.kills')} number={stat.nbKills} />
          <i className={`d-none d-sm-block fas fa-chart-line fa-4x ${styles['text-gr-primary']}`} />
        </div>
        <div className="d-flex flex-column flex-sm-row  align-items-center justify-content-between">
          <IconNumberPresentation className="mb-3 mb-sm-0" icon="minus-square" title={t('player:statistics.deaths')} number={stat.nbDeaths} />
          <IconNumberPresentation icon="percentage" title={t('player:statistics.ratio')} number={(stat.ratio).toFixed(2)} />
        </div>
      </div>
    </div>
  );
}

export default function Statistic({ profileInfo }) {
  const { t } = useTranslation();
  return (
    <section id="statistic">
      <div className="row">
        <div className="col-12">
          <div className="card shadow card-accent mt-4">
            <h3 className="mb-3 text-white">{t('player:statistics.title')}</h3>
            {
            profileInfo ? (
              <div className="row">
                <StatCard className="mb-3 mb-xl-0" title={t('player:statistics.day')} icon="calendar-day" stat={profileInfo.stats.day} />
                <StatCard className="mb-3 mb-xl-0" title={t('player:statistics.season')} icon="calendar-week" stat={profileInfo.stats.season} />
                <StatCard title={t('player:statistics.all')} icon="calendar" stat={profileInfo.stats.all} />
              </div>
            ) : (
              <div style={{ height: 266 }} className="d-flex align-items-center justify-content-center">
                <Spinner variant="white" animation="border" />
              </div>
            )
          }
          </div>
        </div>
      </div>
    </section>

  );
}
