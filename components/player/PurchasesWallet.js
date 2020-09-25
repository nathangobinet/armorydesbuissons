import React from 'react';
import Purchases from './Purchases';
import Wallet from './Wallet';

export default function PurchasesWallet({ profileInfo }) {
  return (
    <section id="purchases-wallet">
      <div className="row">
        <Purchases profileInfo={profileInfo} />
        <Wallet profileInfo={profileInfo} />
      </div>
    </section>
  );
}
