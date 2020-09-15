import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import styles from '../../styles/Home.module.css';

import sandox from '../../public/svgs/icons/sandbox.svg';
import inventory from '../../public/svgs/icons/inventory.svg';
import code from '../../public/svgs/icons/code.svg';

function More() {
  const { t } = useTranslation();
  return (
    <section id="more" className={styles['full-page-section']}>
      <div className={styles['section-content']}>
        <div className="container d-flex flex-column justify-content-center h-100 py-5">
          <div className="my-auto">
            <div className="mb-5 text-center">
              <h1>
                {t('common:home.more.title')}
              </h1>
            </div>
            <div className="container pt-lg-3">
              <div className="row mb-5">
                <div className="col-md-6 text-center">
                  <img className="pb-5 px-3 pb-md-0" alt="Sandbox" src={sandox} width="200px" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="pr-md-5">
                    <h4 className="text-primary mb-4">
                      {t('common:home.more.p1.title')}
                    </h4>
                    <p>
                      {t('common:home.more.p1.sub')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-md-6 d-flex order-md-1 order-2 align-items-center">
                  <div className="text-right pl-md-5">
                    <h4 className="text-primary mb-4">
                      {t('common:home.more.p2.title')}
                    </h4>
                    <p>
                      {t('common:home.more.p2.sub')}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 order-md-2 order-1 text-center">
                  <img className="pb-5 px-3 pb-md-0" alt="Inventory" src={inventory} width="200px" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-center">
                  <img className="pb-5 px-3 pb-md-0" alt="Code" src={code} width="200px" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="pr-md-5">
                    <h4 className="text-primary mb-4">
                      {t('common:home.more.p3.title')}
                    </h4>
                    <p>
                      {t('common:home.more.p3.sub')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default More;
