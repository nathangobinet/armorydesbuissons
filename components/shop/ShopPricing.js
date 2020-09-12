import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import strider from '../../public/images/striders/pnl.png';
import acSvg from '../../public/svgs/icons/ac-round.svg';
import styles from '../../styles/Shop.module.css';

const LAYOUT = {
  BIG: 1,
  MEDIUM: 2,
  LITLE: 3,
};

const RARITY_BG = {
  LEGENDARY: styles['bg-item-orange'],
  EPIC: styles['bg-item-violet'],
  RARE: styles['bg-item-blue'],
  NORMAL: styles['bg-item-green'],
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

function CardItem({
  layout, img, bg, text, subText, ac, requirement,
}) {
  return (
    <div className={`card my-3 shadow w-100 ${bg} ${styles['card-item']} ${getLayoutClass(layout)}  p-0`}>
      {
        (img)
          ? (
            <img
              className={`p-3 img-fluid ${styles.up}`}
              src={img}
              alt="Strider"
              style={{ objectFit: 'contain', maxHeight: '100%' }}
            />
          )
          : (
            <div className="my-auto mx-auto text-white">
              <i className={`fas fa-angle-double-up fa-8x mr-5 pr-5 ${styles.up}`} />
            </div>
          )
      }
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
        <div className={`${styles['shop-card-legend']} ${getLayoutClass(layout)} text-center text-white`}>
          <div>{text}</div>
          {
            subText ? <div>{subText}</div> : ''
          }
          <div className="d-flex justify-content-center align-items-center">
            <img src={acSvg} width={(layout === LAYOUT.MEDIUM) ? '30' : '40'} alt="Armory coins" className="mr-2" />
            <span style={{ marginBottom: 3 }}>{ac}</span>
            {
            requirement ? <em style={{ fontSize: 16 }}>{` - ${requirement}`}</em> : ''
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPricing() {
  const { t } = useTranslation('common');
  return (
    <section id="other-donation" className="container py-5">
      <div className="text-center py-4">
        <h1 className="text-accent mb-4">{t('shop.shopPricing.title')}</h1>
        <p>{t('shop.shopPricing.p1')}</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <CardItem text="Rick & Morty" ac="1500" bg={RARITY_BG.LEGENDARY} img={strider} layout={LAYOUT.BIG} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <CardItem text="Return from the future" ac="700" bg={RARITY_BG.EPIC} img={strider} layout={LAYOUT.MEDIUM} />
          </div>
          <div className="col-lg-6">
            <CardItem text="Black Mirror" requirement="Level 40 required" ac="500" bg={RARITY_BG.RARE} img={strider} layout={LAYOUT.MEDIUM} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <CardItem text="VIP" subText="1 days" ac="100" bg={RARITY_BG.NORMAL} layout={LAYOUT.LITLE} />
          </div>
          <div className="col-lg-4">
            <CardItem text="VIP" subText="7 days" ac="500" bg={RARITY_BG.RARE} layout={LAYOUT.LITLE} />
          </div>
          <div className="col-lg-4">
            <CardItem text="VIP" subText="30 days" ac="1500" bg={RARITY_BG.EPIC} layout={LAYOUT.LITLE} />
          </div>
        </div>
      </div>
    </section>
  );
}
