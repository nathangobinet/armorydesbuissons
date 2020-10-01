import React from 'react';
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
import CustomHeader from '../components/common/CustomHeader';

export default function About() {
  const { t } = useTranslation();
  return (
    <div>
      <CustomHeader title={t('about:head.title')} description={t('about:head.description')} />
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
