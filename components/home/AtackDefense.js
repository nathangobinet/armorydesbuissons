import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import styles from '../../styles/Home.module.css';

import bomb from '../../public/svgs/bomb.svg';

function AtackDefense() {
  const { t } = useTranslation();
  return (
    <section id="attack-defense" className={styles['full-page-section']}>
      <div className={styles['section-content']}>
        <div className="container d-flex flex-column justify-content-center h-100 py-5">
          <div className="my-auto">
            <div className="mb-5 text-center">
              <h1>
                {t('common:home.attackDefense.title')}
              </h1>
            </div>
            <div className="container pt-lg-3">
              <div className="row">
                <div className="col-lg-4 text-center text-lg-right pt-lg-5">
                  <div className="h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h4 className="text-accent">
                        {t('common:home.attackDefense.p1.title')}
                      </h4>
                      <p>
                        {t('common:home.attackDefense.p1.sub')}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-accent">
                        {t('common:home.attackDefense.p2.title')}
                      </h4>
                      <p>
                        {t('common:home.attackDefense.p2.sub')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 text-center">
                  <img className="px-lg-4 py-lg-0 pt-4 pb-5 img-fluid" src={bomb} alt="Bomb" width="500" />
                </div>
                <div className="col-lg-4 text-center text-lg-left pt-lg-5">
                  <div className="d-flex flex-column h-100 justify-content-between">
                    <div>
                      <h4 className="text-accent">
                        {t('common:home.attackDefense.p3.title')}
                      </h4>
                      <p>
                        {t('common:home.attackDefense.p3.sub')}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-accent">
                        {t('common:home.attackDefense.p4.title')}
                      </h4>
                      <p>
                        {t('common:home.attackDefense.p4.sub')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="align-self-center m-0">
            <a className={`${styles['fp-caret-down']} opacity-interaction`} href="#more" alt="Next section">
              <i className={`fa fa-caret-down ${styles.pulse}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AtackDefense;
