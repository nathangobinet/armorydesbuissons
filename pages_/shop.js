import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';
import Description from '../components/shop/Description';
import VipPricing from '../components/shop/VipPricing';
import OtherDonation from '../components/shop/OtherDonation';
import AvailableSkin from '../components/shop/AvailableSkins';
import ShopPricing from '../components/shop/ShopPricing';

export default function Shop() {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t('shop:head.title')}</title>
        <meta name="description" content={t('shop:head.description')} />
      </Head>
      <Navbar />
      <VipPricing />
      <ShopPricing />
      <Description />
      <AvailableSkin />
      <OtherDonation />
      <Footer />
    </div>
  );
}
