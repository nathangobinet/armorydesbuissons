/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../../styles/Footer.module.css';
import logo from '../../../public/svgs/nav/logo-white.svg';

function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="row py-5">
          <div className="col-12">
            <div className="px-3 d-flex flex-column flex-sm-row align-items-center justify-content-between">
              <Link href="/"><a>{t('pages.home')}</a></Link>
              <Link href="/live"><a>{t('pages.live')}</a></Link>
              <Link href="/about"><a>{t('pages.about')}</a></Link>
              <Link href="/shop"><a>{t('pages.shop')}</a></Link>
            </div>
          </div>
        </div>
        <div className="row py-4">
          <div className="col-12">
            <img className="d-block mx-auto img-fluid" src={logo} width="350px" alt="Armory des buissons logo" />
          </div>
        </div>
        <div className="row py-5">
          <div className="col-12 text-center">
            <span className="text-white">{t('footer.copyright')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
