/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import transparentShape1 from '../../public/svgs/shapes/transparentshape1.svg';
import transparentShape2 from '../../public/svgs/shapes/transparentshape2.svg';

export default function Vip() {
  const { t } = useTranslation('common');
  return (
    <section id="vip">
      <div className="bg-accent-or-dark">
        <div className="d-flex h-100">
          <div className="d-flex w-100" style={{ overflow: 'hidden' }}>
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-start mb-auto" alt="" src={transparentShape1} />
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-end m-0" alt="" src={transparentShape2} />
          </div>
          <div className="w-100 h-100 py-4" style={{ marginLeft: '-100%' }}>
            <div className="container py-5">
              <div className="text-center">
                <h1 className="mb-4 text-white">{t('about.vip.title')}</h1>
                <p className="text-white mb-5">
                  {t('about.vip.p1')}
                </p>
              </div>
              <div className="my-4">
                <div className="card my-3 shadow">
                  <div className="text-center">
                    <h4 className="text-accent mb-4">{t('about.vip.subTitle')}</h4>
                    <p className="mb-4">
                      {t('about.vip.p2')}
                    </p>
                    <Link href="/shop">
                      <a className="btn btn-primary px-5">
                        <i className="fas fa-external-link-alt mr-2" />
                        {' '}
                        {t('about.vip.btn')}
                      </a>
                    </Link>
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
