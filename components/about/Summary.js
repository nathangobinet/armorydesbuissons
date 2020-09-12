/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

import screenLogo from '../../public/svgs/screen-logo.svg';

export default function Summary() {
  const { t } = useTranslation('common');
  return (
    <section id="summary" className="container py-5">
      <div className="row py-4">
        <div className="col-md-6 d-flex align-items-center justify-content-center justify-content-md-end">
          <div className="pb-4 pb-mb-0 pr-md-5 pr-0">
            <img className="img-fluid mb-3" src={screenLogo} alt="Armory des buissons logo" width="350" height="350" />
            <div className="text-center">
              <a className="btn btn-accent mr-2 my-1" href="steam://run/107410//-connect=164.132.203.207%20-port=2302">
                <i className="fas fa-gamepad mr-1" />
                {t('common:about.summary.btnConnect')}
              </a>
              <Link href="/#tp-into-fight">
                <a className="btn btn-primary my-1">
                  <i className="fas fa-star mr-1" />
                  {t('common:about.summary.btnFeatures')}
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div>
            <h1 className="text-center text-md-left">{t('common:about.summary.title')}</h1>
            <p>{t('common:about.summary.p1')}</p>
            <ol>
              <a href="#rules"><li>{t('common:about.rules.title')}</li></a>
              <a href="#team"><li>{t('common:about.team.title')}</li></a>
              <a href="#contact"><li>{t('common:about.contact.title')}</li></a>
              <a href="#rank"><li>{t('common:about.rank.title')}</li></a>
              <a href="#vip"><li>{t('common:about.vip.title')}</li></a>
              <a href="#shortcuts"><li>{t('common:about.shortcut.title')}</li></a>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
