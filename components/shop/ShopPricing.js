/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

import acSvg from '../../public/svgs/icons/ac-round.svg';
import styles from '../../styles/Shop.module.css';
import { getUrlAction } from '../../helpers/user';
import useFetch from '../../helpers/useFetch';
import ShopModal from './ShopModal';

const LAYOUT = {
  BIG: 1,
  MEDIUM: 2,
  LITLE: 3,
};

const RARITY_BG = {
  3: styles['bg-item-orange'],
  2: styles['bg-item-violet'],
  1: styles['bg-item-blue'],
  0: styles['bg-item-green'],
};

function getLayoutClass(layout) {
  switch (layout) {
    case LAYOUT.BIG:
      return styles.big;
    case LAYOUT.LITLE:
      return styles.litle;
    default:
      return '';
  }
}

function CardItem(props) {
  const {
    choosedItem, setChoosedItem, setModalActive, layout,
  } = props;

  const {
    img, color, text, subText, isOwned, ac, requirement,
  } = choosedItem;

  const { t } = useTranslation();

  const handleClick = () => {
    setChoosedItem(choosedItem);
    setModalActive(true);
  };

  const ImageOrIcon = () => {
    if (img) {
      return (
        <img
          className={`p-4 img-fluid ${styles.up}`}
          src={img}
          alt="Strider"
          style={{ objectFit: 'contain', maxHeight: '100%' }}
        />
      );
    }
    return (
      <div className="my-auto mx-auto text-white">
        <i className={`fas fa-angle-double-up fa-8x mr-5 pr-5 ${styles.up}`} />
      </div>
    );
  };

  return (
    <div
      tabIndex="0"
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      className={`card my-3 shadow w-100 ${color} ${styles['card-item']} ${getLayoutClass(layout)} text-white p-0`}
    >
      {
        isOwned ? (
          <div style={{ top: '1rem', right: '1rem' }} className="position-absolute font-weight-bold">
            <i className="fas fa-check mr-2" />
            {t('shop:shopPricing.owned')}
          </div>
        ) : ''
      }
      <ImageOrIcon />
      <div
        className={`
          position-absolute d-flex align-items-center justify-content-center 
          ${(layout === LAYOUT.LITLE) ? 'h-100 ' : 'w-100 '} 
          ${(layout === LAYOUT.BIG) ? 'p-4' : 'p-3'}
        `}
        style={{
          bottom: layout !== LAYOUT.LITLE ? 0 : 'initial',
          right: layout === LAYOUT.LITLE ? 0 : 'initial',
          background: 'rgba(0,0,0,.6)',
          borderRadius: layout !== LAYOUT.LITLE ? '0 0 .8rem .8rem' : '0 .8rem .8rem 0',
        }}
      >
        <div className={`${styles['shop-card-legend']} ${getLayoutClass(layout)} text-center`}>
          <div>{text}</div>
          {
            (subText) ? <div>{subText}</div> : ''
          }
          <div className="d-flex justify-content-center align-items-center">
            <img src={acSvg} width="40" alt="Armory Coins" className="mr-2" />
            <span style={{ marginBottom: 3 }}>{ac}</span>
            {
              (requirement) ? <em style={{ fontSize: 16 }}>{` - ${requirement}`}</em> : ''
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function getMappedShop(shop, t) {
  const items = shop.map((item) => ({
    ...item,
    requirement: (item.minLvl) ? t('shop:shopPricing.levelRequired', { level: item.minLvl }) : undefined,
    color: RARITY_BG[item.rarity],
  })).sort((a, b) => b.rarity - a.rarity);
  const vipItems = items.filter((item) => item.product.includes('VIP'));
  const skinItems = items.filter((item) => !item.product.includes('VIP'));
  const mappedVipItems = vipItems.map((item) => ({
    ...item,
    text: 'VIP',
    subText: `${(/(?<=VIP - )\d*/).exec(item.product)[0]} ${t('shop:shopPricing.days')}`, // Do something like '7 days' from 'VIP - 7'
  }));
  const mappedSkinItem = skinItems.map((item) => ({
    ...item,
    text: item.product,
    img: require(`../../public/images/striders/shop/${item.product}.png`),
  }));
  return [...mappedSkinItem, ...mappedVipItems];
}

export default function ShopPricing() {
  const { t } = useTranslation();
  const shop = useFetch('/api/shop', false);

  const [modalActive, setModalActive] = useState(false);
  const [choosedItem, setChoosedItem] = useState(false);
  const [mappedShop, setMappedShop] = useState(false);

  useEffect(() => {
    if (shop) setMappedShop(getMappedShop(shop, t));
  }, [shop]);

  useEffect(() => {
    if (mappedShop) {
      const action = getUrlAction('shop');
      // Check if action and action info have id
      if (action.isAction && action.info.id) {
        // Check if action id exist
        const choosed = mappedShop.find((item) => item.ID === action.info.id);
        if (choosed) {
          setModalActive(true);
          setChoosedItem(choosed);
        }
      }
    }
  }, [mappedShop]);

  return (
    <section id="other-donation" className="container py-5">
      <div className="text-center py-4">
        <h1 className="text-accent mb-4">{t('shop:shopPricing.title')}</h1>
        <p>{t('shop:shopPricing.p1')}</p>
      </div>
      { mappedShop ? (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <CardItem
                  choosedItem={mappedShop[0]}
                  layout={LAYOUT.BIG}
                  setModalActive={setModalActive}
                  setChoosedItem={setChoosedItem}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1">
                <CardItem
                  choosedItem={mappedShop[2]}
                  layout={LAYOUT.MEDIUM}
                  setModalActive={setModalActive}
                  setChoosedItem={setChoosedItem}
                />
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <CardItem
                  choosedItem={mappedShop[1]}
                  layout={LAYOUT.MEDIUM}
                  setModalActive={setModalActive}
                  setChoosedItem={setChoosedItem}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 order-lg-1 order-3">
                <CardItem
                  choosedItem={mappedShop[5]}
                  layout={LAYOUT.LITLE}
                  setModalActive={setModalActive}
                  setChoosedItem={setChoosedItem}
                />
              </div>
              <div className="col-lg-4 order-2">
                <CardItem
                  choosedItem={mappedShop[4]}
                  layout={LAYOUT.LITLE}
                  setModalActive={setModalActive}
                  setChoosedItem={setChoosedItem}
                />
              </div>
              <div className="col-lg-4 order-lg-3 order-1">
                <CardItem
                  choosedItem={mappedShop[3]}
                  layout={LAYOUT.LITLE}
                  setModalActive={setModalActive}
                  setChoosedItem={setChoosedItem}
                />
              </div>
            </div>
          </div>
          <ShopModal
            isActive={modalActive}
            setModalActive={setModalActive}
            choosedItem={choosedItem}
            setBuyed={() => {
              setMappedShop((mappedS) => {
                const item = mappedS.find((s) => s.ID === choosedItem.ID);
                if (!item.product.includes('VIP')) item.isOwned = true;
                return mappedS;
              });
            }}
          />

        </div>
      ) : <div className="py-5">{t('shop:shopPricing.loading')}</div>}
    </section>
  );
}
