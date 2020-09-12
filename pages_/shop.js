import React from 'react';
import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';
import Description from '../components/shop/Description';
import VipPricing from '../components/shop/VipPricing';
import OtherDonation from '../components/shop/OtherDonation';
import AvailableSkin from '../components/shop/AvailableSkins';
import ShopPricing from '../components/shop/ShopPricing';

export default function Shop() {
  return (
    <div>
      <Navbar />
      <VipPricing />
      <ShopPricing />
      <Description />
      <OtherDonation />
      <AvailableSkin />
      <Footer />
    </div>
  );
}

Shop.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});
