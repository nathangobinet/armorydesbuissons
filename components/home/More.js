import React from 'react';
import { useTranslation } from 'react-i18next';

import sandox from '../../public/svgs/icons/sandbox.svg';
import inventory from '../../public/svgs/icons/inventory.svg';
import code from '../../public/svgs/icons/code.svg';

function More() {
  const { t } = useTranslation('common');
  return (
    <section id="more" className="full-page-section">
      <div className="section-content">
        <div className="container d-flex flex-column justify-content-center h-100 py-5">
          <div className="my-auto">
            <div className="mb-5 text-center">
              <h1 data-aos="fade">
                {t('home.more.title')}
              </h1>
            </div>
            <div className="container pt-lg-3">
              <div className="row mb-5">
                <div className="col-md-6 text-center">
                  <img className="pb-5 px-3 pb-md-0" alt="Sandbox" src={sandox} width="200px" data-aos="zoom-in" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="pr-md-5" data-aos="fade-left">
                    <h4 className="text-primary mb-4">
                      {t('home.more.p1.title')}
                    </h4>
                    <p>
                      {t('home.more.p1.sub')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-md-6 d-flex order-md-1 order-2 align-items-center">
                  <div className="text-right pl-md-5" data-aos="fade-right">
                    <h4 className="text-primary mb-4">
                      {t('home.more.p2.title')}
                    </h4>
                    <p>
                      {t('home.more.p2.sub')}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 order-md-2 order-1 text-center">
                  <img className="pb-5 px-3 pb-md-0" alt="Inventory" src={inventory} width="200px" data-aos="zoom-in" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-center">
                  <img className="pb-5 px-3 pb-md-0" alt="Code" src={code} width="200px" data-aos="zoom-in" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="pr-md-5" data-aos="fade-left">
                    <h4 className="text-primary mb-4">
                      {t('home.more.p3.title')}
                    </h4>
                    <p>
                      {t('home.more.p3.sub')}
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
