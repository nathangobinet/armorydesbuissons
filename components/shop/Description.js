import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../styles/Shop.module.css';
import shape3 from '../../public/svgs/shapes/shape3.svg';

export default function Description() {
  const { t } = useTranslation();
  return (
    <section id="description" className="mb-5">
      <div className="d-flex h-100">
        <div className="container text-center mx-auto">
          <img className="img-fluid mx-auto" alt="" src={shape3} width="800px" />
        </div>
        <div className="w-100 h-100" style={{ marginLeft: '-100%' }}>
          <div className="container d-flex flex-column justify-content-center h-100 py-5">
            <div className="my-auto">
              <div className="d-flex w-100 justify-content-center mt-md-5 pt-md-5 pl-md-5">
                <div className="card text-center shadow" style={{ maxWidth: '400px' }}>
                  <h1>{t('common:shop.description.title')}</h1>
                  <span className={`my-4 mx-auto ${styles['round-primary']}`}><i className="fas fa-angle-double-up" /></span>
                  <p>{t('common:shop.description.p1')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-center">
          <p className="mb-5">{t('common:shop.description.p2')}</p>
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mx-auto" style={{ maxWidth: '800px' }}>
            <div style={{ maxWidth: '300px' }} className="py-2">
              <div className="text-primary mb-3"><i className="fas fa-6x fa-palette" /></div>
              <p>{t('common:shop.description.p3')}</p>
            </div>
            <div style={{ maxWidth: '300px' }} className="py-2">
              <div className="text-accent mb-3"><i className="fas fa-6x fa-stream" /></div>
              <p>{t('common:shop.description.p4')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
