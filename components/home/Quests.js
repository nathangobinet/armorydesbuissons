import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import ac from '../../public/svgs/icons/ac.svg';
import quest from '../../public/svgs/icons/quest.svg';
import levels from '../../public/svgs/icons/levels.svg';

import shape1 from '../../public/svgs/shapes/transparentshape1.svg';
import shape2 from '../../public/svgs/shapes/transparentshape2.svg';
import styles from '../../styles/Home.module.css';

function Section({ image, title, text }) {
  return (
    <div className="card my-3 shadow">
      <div className="d-flex flex-column flex-sm-row align-items-center ">
        <div className=" mr-0 ml-sm-3 mr-sm-4 ml-lg-4 mr-lg-5 flex-shrink-0 mb-sm-0 mb-3">
          <div className={`${styles['round-accent']} d-flex `}>
            <img alt="" className="mx-auto" src={image} width="50" />
          </div>
        </div>
        <div className="text-center text-sm-left">
          <h4 className="text-accent mb-2">{title}</h4>
          <p className="mb-0">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function Quests() {
  const { t } = useTranslation();
  return (
    <section id="quests" className={`${styles['full-page-section']} bg-primary-or-dark`}>
      <div className={styles['section-content']}>
        <div className="d-flex h-100">
          <div className="d-flex h-100 w-100" style={{ overflow: 'hidden' }}>
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-start mb-auto" src={shape1} alt="Shape" />
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-end m-0" src={shape2} alt="Shape" />
          </div>
          <div className="w-100 h-100" style={{ marginLeft: '-100%' }}>
            <div className="container d-flex flex-column justify-content-center h-100 py-5">
              <div className="my-auto">
                <h1 className="text-white text-center mb-5 pb-lg-5">
                  {t('common:home.quests.title')}
                </h1>
                <div className="my-4">
                  <Section image={quest} text={t('common:home.quests.quest.text')} title={t('common:home.quests.quest.title')} />
                  <Section image={levels} text={t('common:home.quests.levels.text')} title={t('common:home.quests.levels.title')} />
                  <Section image={ac} text={t('common:home.quests.ac.text')} title={t('common:home.quests.ac.title')} />
                </div>
              </div>
              <div className="align-self-center m-0">
                <a className={`${styles['fp-caret-down']} text-white-or-accent opacity-interaction`} label="Go to next section" href="#attack-defense">
                  <i className={`fas fa-caret-down ${styles.pulse}`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
