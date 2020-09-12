import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import transparentShape1 from '../../public/svgs/shapes/transparentshape1.svg';
import transparentShape2 from '../../public/svgs/shapes/transparentshape2.svg';
import styles from '../../styles/About.module.css';

function Rule({ number, title, text }) {
  return (
    <div className="card my-3 shadow">
      <div className="d-flex flex-column flex-sm-row align-items-center ">
        <div className=" mr-0 ml-sm-3 mr-sm-4 ml-lg-4  mr-lg-5 flex-shrink-0 mb-sm-0 mb-3">
          <span className={styles['round-primary']}>{number}</span>
        </div>
        <div className="text-center text-sm-left">
          <h4 className="text-accent mb-2">{title}</h4>
          <p className="mb-0">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function Rules() {
  const { t } = useTranslation('common');
  return (
    <section id="rules">
      <div className="bg-accent-or-dark">
        <div className="d-flex h-100">
          <div className="d-flex w-100" style={{ overflow: 'hidden' }}>
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-start mb-auto" alt="" src={transparentShape1} />
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-end m-0" alt="" src={transparentShape2} />
          </div>
          <div className="w-100 h-100 py-4" style={{ marginLeft: '-100%' }}>
            <div className="container py-5">
              <div className="text-center">
                <h1 className="mb-4 text-white">{t('common:about.rules.title')}</h1>
                <p className="text-white">
                  {t('common:about.rules.p1')}
                </p>
              </div>
              <div className="my-4">
                <Rule number={1} text={t('common:about.rules.carkill.text')} title={t('about.rules.carkill.title')} />
                <Rule number={2} text={t('common:about.rules.boost.text')} title={t('about.rules.boost.title')} />
                <Rule number={3} text={t('common:about.rules.glitch.text')} title={t('about.rules.glitch.title')} />
                <Rule number={4} text={t('common:about.rules.fairplay.text')} title={t('about.rules.fairplay.title')} />
              </div>
              <div className="text-center">
                <p className="text-white">
                  {t('common:about.rules.p2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
