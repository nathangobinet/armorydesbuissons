import React, { useState } from 'react';
import config from '../../helpers/config';
import { useAuth } from '../../helpers/user';

import acSvg from '../../public/svgs/icons/ac-round.svg';
import styles from '../../styles/Shop.module.css';

function ButtonSection({ choosedItem, authInfo, onBuy }) {
  if (authInfo && authInfo.auth) {
    if (!authInfo.alreadyConnected || authInfo.playerInfo === undefined) {
      return <div className="font-weight-bold">You have never logged on to the server. Please log in once before making a purchase.</div>;
    }
    if (authInfo.playerInfo.ac < choosedItem.ac) {
      return <div className="font-weight-bold">You don't have enough Armory Coins to buy this item</div>;
    }
    if (choosedItem.isOwned) {
      return <div className="font-weight-bold">You already own this item</div>;
    }
    return <button type="button" onClick={onBuy} className="btn btn-lg btn-primary px-5">Buy</button>;
  }
  return (
    <a
      href={`${config.httpserver}/api/auth/steam?action=${encodeURIComponent(JSON.stringify({ type: 'shop', id: choosedItem.ID }))}`}
      className="btn btn-lg btn-primary px-5"
    >
      Log in with steam
    </a>
  );
}

function PlayerSection({ authInfo }) {
  return (
    <div className="order-1 order-sm-0">
      <div style={{
        fontFamily: '"Montserrat", sans-serif', fontSize: 35, fontWeight: 600, marginBottom: 5,
      }}
      >
        {(authInfo.playerInfo) ? authInfo.playerInfo.lastPseudo : 'Unknown'}
      </div>
      <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
        <img src={acSvg} alt="" width="40" className="mr-3" />
        <span style={{
          fontFamily: '"Montserrat", sans-serif', fontSize: 30, fontWeight: 600, marginBottom: 2,
        }}
        >
          {(authInfo.playerInfo) ? authInfo.playerInfo.ac : 0}
        </span>
      </div>
    </div>
  );
}

function BuySection({ choosedItem, authInfo, onBuy }) {
  return (
    <div>
      <div style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
      }}
      >
        {
          (choosedItem && choosedItem.img) ? (
            <img className="img-fluid" src={choosedItem.img} alt="strider" />
          ) : (
            <div className="text-white">
              <i style={{ fontSize: '20rem' }} className="fas fa-angle-double-up" />
            </div>
          )
        }
      </div>
      <div
        style={{
          position: 'absolute', bottom: '9rem', fontSize: 45, fontFamily: '"Montserrat", sans-serif', fontWeight: 600,
        }}
        className="w-100 text-center"
      >
        {choosedItem.text}
        {(choosedItem.subText) ? ` - ${choosedItem.subText}` : ''}
      </div>
      <div style={{ position: 'absolute', bottom: '5rem' }} className="w-100 text-center">
        <ButtonSection choosedItem={choosedItem} authInfo={authInfo} onBuy={onBuy} />
      </div>
    </div>
  );
}

function SuccessSection() {
  return (
    <div
      style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      }}
      className="text-center"
    >
      <i className="fa-10x fas fa-check mb-4" />
      <div>
        Your purchase has been successfully completed.
        {' '}
        You must perform an in-game disconnect/reconnect to enjoy it.
      </div>
    </div>
  );
}

function ErrorSection() {
  return (
    <div
      style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      }}
      className="text-center"
    >
      <i className="fa-10x fas fa-times mb-4" />
      <div>
        An unexpected error occurred.
        {' '}
        Please try again and contact an administrator if the problem persists.
      </div>
    </div>
  );
}

export default function ShopModal({ isActive, setModalActive, choosedItem }) {
  const authInfo = useAuth();
  const [isBuy, setIsBuy] = useState(false);

  const onBuy = async () => {
    const rawResponse = await fetch(`${config.httpserver}/api/shop`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: choosedItem.product,
        ac: choosedItem.ac,
      }),
    });
    const content = await rawResponse.json();
    if (content.success && content.result) setIsBuy('success');
    else setIsBuy('error');
  };

  const Content = () => {
    if (choosedItem) {
      if (isBuy === false) {
        return <BuySection choosedItem={choosedItem} authInfo={authInfo} onBuy={onBuy} />;
      }
      if (isBuy === 'success') return <SuccessSection />;
      if (isBuy === 'error') return <ErrorSection />;
    }
    return <div>Error</div>;
  };

  return (choosedItem) ? (
    <div
      className={styles['shop-modal']}
      style={{ visibility: (isActive) ? 'visible' : 'hidden', opacity: (isActive) ? 1 : 0 }}
    >
      <div className="p-4 d-flex flex-column text-center flex-sm-row justify-content-sm-between align-items-center">
        {(authInfo && authInfo.auth) ? <PlayerSection authInfo={authInfo} /> : <div />}
        <button
          onClick={() => { setModalActive(false); }}
          className={`${styles['close-button']} order-0 order-sm-1 align-self-sm-start`}
          type="button"
        >
          <i aria-label="Close" className="fas fa-times fa-3x" />
        </button>
      </div>
      <Content />
    </div>
  ) : '';
}
