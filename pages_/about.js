import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';
import Summary from '../components/about/Summary';
import Rules from '../components/about/Rules';
import Team from '../components/about/Team';
import Contact from '../components/about/Contact';
import Rank from '../components/about/Rank';
import Vip from '../components/about/Vip';
import Shortcuts from '../components/about/Shortcuts';

export default function About() {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t('about:head.title')}</title>
        <meta name="description" content={t('about:head.description')} />
      </Head>
      <Navbar />
      <Summary />
      <Rules />
      <Team />
      <Contact />
      <Rank />
      <Vip />
      <Shortcuts />
      <Footer />
    </div>
  );
}
