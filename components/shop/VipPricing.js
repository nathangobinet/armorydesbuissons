import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import PaymentModal from './PaymentModal';

import styles from '../../styles/Shop.module.css';
import transparentShape1 from '../../public/svgs/shapes/transparentshape1.svg';
import transparentShape2 from '../../public/svgs/shapes/transparentshape2.svg';
import { getUrlAction } from '../../helpers/user';

function PriceCard({
  id, period, price, priceBeforeDiscount, discoutPercentage, ac, handleBuy, highlight,
}) {
  const { t } = useTranslation();
  return (
    <div className={`col-lg-4 px-lg-4 my-3 ${highlight ? 'pt-lg-4' : ''}`}>
      <div className="card shadow">
        <div className="text-center">
          <div className={`${styles['text-day-pricing']} mb-4`}>
            <div className="text-primary">{period}</div>
            <div>{t('common:shop.pricing.days')}</div>
          </div>
          <div className={`${styles['text-price-pricing']} mb-4`}>
            { priceBeforeDiscount ? (
              <span className={styles['text-old-price']}>
                {priceBeforeDiscount}
                €
              </span>
            ) : ''}
            <span className={styles['text-price']}>
              {price}
              €
            </span>
            { discoutPercentage ? (
              <div>
                <span className={styles['badge-promo']}>
                  {discoutPercentage}
                  %
                </span>
              </div>
            ) : ''}
          </div>
          <div className="text-left mx-auto mb-4" style={{ maxWidth: '190px' }}>
            <div>
              <i className="fas fa-check mr-3" />
              {t('common:shop.pricing.skins')}
            </div>
            <div>
              <i className="fas fa-check mr-3" />
              {t('common:shop.pricing.slots')}
            </div>
            <div>
              <i className="fas fa-check mr-3" />
              <b className="text-accent">
                +
                {ac}
              </b>
              {' '}
              {t('common:shop.pricing.ac')}
            </div>
          </div>
          <button type="button" onClick={() => handleBuy(id)} className="btn btn-primary my-1 px-5">
            <i className="fas fa-shopping-cart mr-2" />
            {t('common:shop.pricing.btn')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VipPricing() {
  const vipItems = [{
    id: 1, days: 30, price: 3, ac: 50,
  }, {
    id: 2,
    days: 90,
    price: 8,
    ac: 150,
    priceBeforeDiscount: 9,
    discoutPercentage: -10,
    highlight: true,
  }, {
    id: 3, days: 180, price: 15, ac: 300, priceBeforeDiscount: 18, discoutPercentage: -15,
  }];

  // isAction is used to know where the shop page have to react to the url
  const [isAction, setIsAction] = useState(false);
  const [isShowModal, setsIsShowModal] = useState(false);
  const [choosedItem, setChoosedItem] = useState(false);

  useEffect(() => {
    const action = getUrlAction('vip');
    // Check if action and action info have id
    if (action.isAction && action.info.id) {
      // Check if action id exist
      if (vipItems.some((item) => item.id === action.info.id)) {
        setIsAction(true);
        setsIsShowModal(true);
        setChoosedItem(action.info.id);
      }
    }
  }, []);

  const hideModal = () => {
    setsIsShowModal(false);
  };

  const handleBuy = (id) => {
    setChoosedItem(id);
    setsIsShowModal(true);
  };

  const { t } = useTranslation();
  return (
    <>
      <section id="pricing">
        <div className="bg-accent-or-dark">
          <div className="d-flex h-100">
            <div className="d-flex w-100" style={{ overflow: 'hidden' }}>
              <img style={{ userSelect: 'none' }} className="img-fluid align-self-start mb-auto" alt="" src={transparentShape1} />
              <img style={{ userSelect: 'none' }} className="img-fluid align-self-end m-0" alt="" src={transparentShape2} />
            </div>
            <div className="w-100 h-100 py-5" style={{ marginLeft: '-100%' }}>
              <div className="container d-flex flex-column justify-content-center h-100 py-5">
                <div className="my-auto">
                  <h1 className="text-white text-center mb-3 pb-5">{t('common:shop.pricing.title')}</h1>
                  <div className="row">
                    {
                    vipItems.map((item) => (
                      <PriceCard
                        key={item.id}
                        id={item.id}
                        period={item.days}
                        price={item.price}
                        priceBeforeDiscount={item.priceBeforeDiscount}
                        discoutPercentage={item.discoutPercentage}
                        ac={item.ac}
                        highlight={item.highlight}
                        handleBuy={handleBuy}
                      />
                    ))
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PaymentModal
        steamCallback={isAction}
        show={isShowModal}
        hideModal={hideModal}
        choosedItem={vipItems.find((item) => item.id === choosedItem)}
      />
    </>
  );
}
