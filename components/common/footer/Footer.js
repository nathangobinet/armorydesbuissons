/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../../styles/Footer.module.css';
import logo from '../../../public/svgs/nav/logo-white.svg';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="row py-5">
          <div className="col-12">
            <div className="px-3 d-flex flex-column flex-sm-row align-items-center justify-content-between">
              <Link href="/"><a>{t('common:pages.home')}</a></Link>
              <Link href="/live"><a>{t('common:pages.live')}</a></Link>
              <Link href="/about"><a>{t('common:pages.about')}</a></Link>
              <Link href="/shop"><a>{t('common:pages.shop')}</a></Link>
            </div>
          </div>
        </div>
        <div className="row py-4">
          <div className="col-12">
            <img className="d-block mx-auto img-fluid" src={logo} width="350" alt="Armory des buissons logo" />
          </div>
        </div>
        <div className="row py-5">
          <div className="col-12 text-center">
            <div className="text-white"><Link href="/legals"><a>{t('common:pages.legals')}</a></Link></div>
            <span className="text-white">{t('common:footer.copyright')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
