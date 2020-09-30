/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import styles from '../../styles/Home.module.css';

import shape from '../../public/svgs/shapes/shape2.svg';
import rank from '../../public/svgs/icons/rank.svg';

function Ranking() {
  const { t } = useTranslation();
  return (
    <section id="ranking" className={styles['full-page-section']}>
      <div className={styles['section-content']}>
        <div className="d-flex h-100">
          <div className="container my-auto pl-md-5 pt-md-5 mt-md-5">
            <img className="img-fluid" src={shape} width="600" alt="" />
          </div>
          <div className="w-100 h-100" style={{ marginLeft: '-100%' }}>
            <div className="container d-flex flex-column justify-content-center h-100 py-5">
              <div className="my-auto">
                <div className="d-flex w-100 justify-content-center mt-md-5 pt-md-5 pl-md-5">
                  <div className="card text-center shadow" style={{ maxWidth: '400px' }}>
                    <h1 className="text-primary">
                      {t('home:ranking.title')}
                    </h1>
                    <img className="py-4 mx-auto" src={rank} width="90" alt="Rank" />
                    <p className="mb-4">
                      {t('home:ranking.paragraph')}
                    </p>
                    <Link href="/about#rank">
                      <a className="btn btn-primary mx-4">{t('home:ranking.button')}</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="align-self-center m-0">
                <a className={`${styles['fp-caret-down']} opacity-interaction`} href="#quests">
                  <i className={`fa fa-caret-down ${styles.pulse}`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ranking;
