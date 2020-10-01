import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';
import Description from '../components/shop/Description';
import VipPricing from '../components/shop/VipPricing';
import OtherDonation from '../components/shop/OtherDonation';
import AvailableSkin from '../components/shop/AvailableSkins';
import ShopPricing from '../components/shop/ShopPricing';
import CustomHeader from '../components/common/CustomHeader';

export default function Shop() {
  const { t } = useTranslation();
  return (
    <div>
      <CustomHeader title={t('shop:head.title')} description={t('shop:head.description')} />
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
