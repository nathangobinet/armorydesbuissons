import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../styles/Home.module.css';
import striderShape from '../../public/svgs/shapes/strider-shape.svg';
import soldierShape from '../../public/svgs/shapes/soldier-shape.svg';

function ChooseYourGameplay() {
  const { t } = useTranslation();
  return (
    <section id="choose-your-gameplay" className={styles['full-page-section']}>
      <div className={styles['section-content']}>
        <div className="container d-flex flex-column justify-content-center h-100 py-5">
          <div className="my-auto">
            <div className="mb-5 text-center">
              <h1>
                {t('home:chooseYourGameplay.title')}
              </h1>
              <h4>
                {t('home:chooseYourGameplay.subTitle')}
              </h4>
            </div>
            <div className="d-flex flex-column flex-md-row">
              <div className="px-md-4 align-self-end">
                <div className="mb-5">
                  <img className="img-fluid mx-auto d-block" src={striderShape} alt="Shape with striders" />
                </div>
                <div className="text-center px-md-4">
                  <h4 className="text-accent">
                    {t('home:chooseYourGameplay.striderTitle')}
                  </h4>
                  <p>
                    {t('home:chooseYourGameplay.striderParagraph')}
                  </p>
                </div>
              </div>
              <div className="px-md-4">
                <div className="mb-5">
                  <img className="img-fluid mx-auto d-block" src={soldierShape} alt="Shape with soldiers" />
                </div>
                <div className="text-center px-md-4">
                  <h4 className="text-primary">
                    {t('home:chooseYourGameplay.soldierTitle')}
                  </h4>
                  <p>
                    {t('home:chooseYourGameplay.soldierParagraph')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="align-self-center m-0">
            <a className={`${styles['fp-caret-down']} opacity-interaction`} href="#versus">
              <i className={`fa fa-caret-down ${styles.pulse}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChooseYourGameplay;
