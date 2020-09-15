import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../styles/Home.module.css';
import altisMap from '../../public/svgs/altis-map.svg';

function TpIntoFight() {
  const { t } = useTranslation();
  return (
    <section id="tp-into-fight" className={styles['full-page-section']}>
      <div className={styles['section-content']}>
        <div className="container d-flex flex-column justify-content-center h-100 py-5">
          <div className="my-auto">
            <div className="text-center">
              <h1 className="mb-5">
                {t('common:home.tpintofight.title')}
              </h1>
              <div className="mb-5">
                <img className="img-fluid" alt="Map of Altis" src={altisMap} width="930" height="390" />
              </div>
              <p>
                {t('common:home.tpintofight.beforeKey')}
                <kbd>Y</kbd>
                {t('common:home.tpintofight.afterKey')}
              </p>
            </div>
          </div>
          <div className="align-self-center m-0">
            <a className={`${styles['fp-caret-down']} opacity-interaction`} href="#choose-your-gameplay" alt="Next section">
              <i className={`fa fa-caret-down ${styles.pulse}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TpIntoFight;
