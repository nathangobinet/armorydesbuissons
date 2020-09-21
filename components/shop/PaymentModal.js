/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

import { PayPalButton } from 'react-paypal-button-v2';
import Link from 'next/link';
import styles from '../../styles/Shop.module.css';
import useFetch from '../../helpers/useFetch';
import { updateUser, useAuth } from '../../helpers/user';
import config from '../../helpers/config';

const MODAL_SCREEEN = {
  LOGIN: 0,
  PLAYERID: 1,
  INNFORMATION: 2,
  PAYMENT: 3,
  LOADING: 4,
  SUCCESS: 5,
  ERROR: 6,
};

function setSteamInfo(setPaymentInfo, setScreen, userInfo) {
  setPaymentInfo((pInfo) => ({
    ...pInfo,
    playerId: userInfo.id,
    lastName: (userInfo.playerInfo) ? userInfo.playerInfo.lastPseudo : 'Unknown',
  }));
  setScreen(MODAL_SCREEEN.INNFORMATION);
}

function BackButton({ onClick }) {
  return (
    <button
      className={`btn d-none d-lg-block ${styles['btn-back']}`}
      type="button"
      onClick={onClick}
    >
      <i className="fas fa-chevron-left text-primary" style={{ fontSize: 32 }} />
    </button>
  );
}

function Error({ hide }) {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="text-accent mb-0">{t('shop:vipPricing.modal.error.title')}</h3>
      <div className="py-4">
        <div className="mb-2"><i className="fas fa-times fa-3x" /></div>
        <p className="mb-0">
          {t('shop:vipPricing.modal.error.message')}
        </p>
      </div>
      <button type="button" onClick={hide} className={`my-2 mx-auto btn btn-primary btn-block ${styles['btn-size']}`}>
        {t('shop:vipPricing.modal.error.btnBack')}
        <i className="fas fa-chevron-right ml-4" />
      </button>
    </div>
  );
}

function Success({ paymentInfo }) {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="text-accent mb-0">{t('shop:vipPricing.modal.success.title')}</h3>
      <div className="py-4">
        <div className="mb-2"><i className="fas fa-heart fa-3x" /></div>
        <p className="mb-0">
          {t('shop:vipPricing.modal.success.message')}
        </p>
      </div>
      <Link href={`/p/${paymentInfo.playerId}`}>
        <a className={`my-2 mx-auto btn btn-primary btn-block ${styles['btn-size']}`}>
          {t('shop:vipPricing.modal.success.btnProfile')}
          <i className="fas fa-chevron-right ml-4" />
        </a>
      </Link>

    </div>
  );
}

function Loading() {
  const { t } = useTranslation();
  return (
    <div>
      <Spinner animation="border" variant="primary">
        <span className="sr-only">{t('shop:vipPricing.modal.loading.message')}</span>
      </Spinner>
    </div>
  );
}

function Payment({ setScreen, paymentInfo }) {
  const { t } = useTranslation();
  const setLoadingScreen = () => { setScreen(MODAL_SCREEEN.LOADING); };
  const removeLoadingScreen = () => { setScreen(MODAL_SCREEEN.PAYMENT); };

  const onSuccess = async () => {
    const rawResponse = await fetch(`${config.httpserver}/api/shop/vip`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: paymentInfo.playerId,
        days: paymentInfo.days,
        mail: paymentInfo.mail ? paymentInfo.mail : undefined,
        ac: paymentInfo.ac,
      }),
    });
    const content = await rawResponse.json();
    if (content.result !== undefined && content.result === true) {
      updateUser((user) => ({
        ...user, playerInfo: { ...user.playerInfo, ac: user.playerInfo.ac + paymentInfo.ac },
      }));
      setScreen(MODAL_SCREEEN.SUCCESS);
    } else setScreen(MODAL_SCREEEN.ERROR);
  };

  const onError = (err) => {
    console.log(err);
    setScreen(MODAL_SCREEEN.ERROR);
  };

  return (
    <div>
      <h3 className="text-accent mb-0">{t('shop:vipPricing.modal.payment.title')}</h3>
      <div style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
        <div className="table-responsive mb-2">
          <table
            style={{ width: '75%', whiteSpace: 'nowrap' }}
            className="mx-auto table table-sm m-0"
          >
            <thead>
              <tr>
                <th scope="col">{t('shop:vipPricing.modal.payment.quantity')}</th>
                <th scope="col">{t('shop:vipPricing.modal.payment.item')}</th>
                <th scope="col">{t('shop:vipPricing.modal.payment.period')}</th>
                <th scope="col">{t('shop:vipPricing.modal.payment.bonus')}</th>
                <th scope="col">{t('shop:vipPricing.modal.payment.price')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>VIP</td>
                <td>{`${paymentInfo.days} ${t('shop:vipPricing.modal.payment.days')}`}</td>
                <td>{`${paymentInfo.ac} Armory Coins`}</td>
                <td>{`${paymentInfo.price}€`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-0">
          {t('shop:vipPricing.modal.payment.to')}
          {' '}
          <b className="text-accent">{paymentInfo.playerId}</b>
          {' '}
          {t('shop:vipPricing.modal.payment.lastSeen')}
          {' '}
          <b className="text-accent">{paymentInfo.lastName}</b>
        </p>
      </div>
      <div className={`my-2 mx-auto ${styles['btn-size']}`}>
        <PayPalButton
          style={{ layout: 'horizontal', shape: 'pill', tagline: false }}
          onClick={setLoadingScreen}
          onCancel={removeLoadingScreen}
          onSuccess={onSuccess}
          onError={onError}
          catchError={onError}
          shippingPreference="NO_SHIPPING"
          amount={paymentInfo.price}
          options={{
            clientId: 'AVjsijz7YM8XK9sHmrETzj-smASi3dbjAMN0S7IzMAL7UiSPYfD41bXRbpfacjd_Z3DA_jFtj6tOMpe0',
            currency: 'EUR',
          }}
        />
      </div>
    </div>
  );
}

function Information({ setScreen, setPaymentInfo }) {
  const { t } = useTranslation();
  const [mailWanted, setMailWanted] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mail, setMail] = useState('');
  const regMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const onChange = (event) => {
    setMail(event.target.value);
    if (regMail.test(event.target.value)) setIsCorrect(true);
    else setIsCorrect(false);
  };

  const onClick = () => {
    setPaymentInfo((paymentInfo) => ({ ...paymentInfo, mail: mailWanted ? mail : undefined }));
    setScreen(MODAL_SCREEEN.PAYMENT);
  };

  return (
    <div>
      <h3 className="text-accent mb-0">{t('shop:vipPricing.modal.mail.title')}</h3>
      <div className="py-5">
        <input
          type="email"
          id="email"
          placeholder={t('shop:vipPricing.modal.mail.placeHolderMail')}
          className={`${styles.input} mx-auto`}
          onChange={onChange}
          disabled={!mailWanted}
        />
        <div className="custom-control custom-checkbox pt-2">
          <input type="checkbox" className="custom-control-input" id="noEmail" onChange={() => setMailWanted((w) => !w)} />
          <label className="custom-control-label pb-1" htmlFor="noEmail" style={{ lineHeight: 1.4 }}>
            <small>{t('shop:vipPricing.modal.mail.dontWantMail')}</small>
          </label>
        </div>
      </div>
      <button
        className={`my-2 mx-auto btn btn-primary btn-block ${styles['btn-size']}`}
        type="button"
        onClick={onClick}
        disabled={!(!mailWanted || isCorrect)}
      >
        {t('shop:vipPricing.modal.btnValidate')}
        <i className="fas fa-chevron-right ml-4" />
      </button>
    </div>
  );
}

function PlayerID({ setScreen, setPaymentInfo }) {
  const { t } = useTranslation();
  const [isCorrect, setIsCorrect] = useState(false);
  const [input, setInput] = useState('');
  const playerName = useFetch('/api/playerName', undefined, { id: input }, 'GET');
  const regId = /^[0-9]{17}$/;

  const onChange = (event) => {
    setInput(event.target.value);
    if (regId.test(event.target.value)) setIsCorrect(true);
    else setIsCorrect(false);
  };

  const onClick = () => {
    setPaymentInfo((paymentInfo) => ({ ...paymentInfo, playerId: input, lastName: playerName }));
    setScreen(MODAL_SCREEEN.INNFORMATION);
  };

  return (
    <div>
      <h3 className="text-accent mb-3">{t('shop:vipPricing.modal.playerId.title')}</h3>
      <p className="mb-0">
        {t('shop:vipPricing.modal.playerId.infoPlayerId')}
        {' '}
        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=0fzyr0g0wvk">
          {t('shop:vipPricing.modal.playerId.arma3Profile')}
        </a>
      </p>
      <div style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
        <input
          type="number"
          id="playerId"
          placeholder={t('shop:vipPricing.modal.playerId.placeHolderPlayerId')}
          className={`${styles.input} mx-auto`}
          onChange={onChange}
        />
        <div style={{
          transition: 'opacity O.5s', opacity: (isCorrect) ? 1 : 0, fontSize: 14, marginTop: 8,
        }}
        >
          <i className={`fas ${(playerName === null) ? 'fa-times' : 'fa-check'} mr-2`} />
          {(playerName === null)
            ? t('shop:vipPricing.modal.playerId.idNotMatch')
            : t('shop:vipPricing.modal.playerId.lastSeenUnder', { pseudo: playerName })}
        </div>
      </div>
      <button
        className={`my-2 mx-auto btn btn-primary btn-block ${styles['btn-size']}`}
        type="button"
        onClick={onClick}
        disabled={!(isCorrect && playerName !== null)}
      >
        {t('shop:vipPricing.modal.btnValidate')}
        <i className="fas fa-chevron-right ml-4" />
      </button>
    </div>
  );
}

function Login({ setScreen, setPaymentInfo, paymentInfo }) {
  const { t } = useTranslation();
  const userInfo = useAuth();
  const isAuth = userInfo ? userInfo.auth : false;
  const SteamButton = () => {
    if (!isAuth) {
      return (
        <a
          href={`${config.httpserver}/api/auth/steam?action=${encodeURIComponent(JSON.stringify({ type: 'vip_steam_connexion', id: paymentInfo.id }))}`}
          className={`my-2 mx-auto btn btn-primary btn-block ${styles['btn-size']}`}
        >
          {t('shop:vipPricing.modal.login.btnLoginSteam')}
          <i className="fas fa-chevron-right ml-4" />
        </a>
      );
    }
    return (
      <button
        onClick={() => { setSteamInfo(setPaymentInfo, setScreen, userInfo); }}
        type="button"
        className={`my-2 mx-auto btn btn-primary btn-block ${styles['btn-size']}`}
      >
        {t('shop:vipPricing.modal.login.btnContinueSteam')}
        <i className="fas fa-chevron-right ml-4" />
      </button>
    );
  };

  return (
    <div>
      <h3 className="text-accent">{t('shop:vipPricing.modal.login.title')}</h3>
      <div className="py-5">
        <SteamButton />
        <button
          className={`my-2 mx-auto btn btn-primary btn-block ${styles['btn-size']}`}
          type="button"
          onClick={() => { setScreen(MODAL_SCREEEN.PLAYERID); }}
        >
          {t('shop:vipPricing.modal.login.btnPlayerId')}
          <i className="fas fa-chevron-right ml-4" />
        </button>
      </div>
    </div>
  );
}

function ModalScreenWrapper(props) {
  const {
    backTo, setScreen, visibility, Screen, hide, setPaymentInfo, paymentInfo,
  } = props;
  return (
    <div style={{
      position: 'absolute',
      width: '90%',
      transition: 'opacity .5s',
      opacity: (visibility) ? 1 : 0,
      visibility: (visibility) ? 'visible' : 'hidden',
      zIndex: (visibility) ? '1051' : '-1',
    }}
    >
      {
      backTo !== undefined
        ? <BackButton onClick={() => { setScreen(backTo); }} />
        : ''
      }
      <div className="text-center">
        <Screen
          setScreen={setScreen}
          hide={hide}
          setPaymentInfo={setPaymentInfo}
          paymentInfo={paymentInfo}
        />
      </div>
    </div>
  );
}

export default function PaymentModal({
  steamCallback, show, hideModal, choosedItem,
}) {
  const userInfo = useAuth();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState({});

  const hideAndResetModal = () => {
    hideModal();
    setCurrentScreen(MODAL_SCREEEN.LOGIN);
  };

  // Check if steam callback
  // Then set loading
  useEffect(() => {
    if (steamCallback) setCurrentScreen(MODAL_SCREEEN.LOADING);
  }, [steamCallback]);

  // Check if steam callback
  // Then set loading
  useEffect(() => {
    if (steamCallback && userInfo && userInfo.auth) {
      setSteamInfo(setPaymentInfo, setCurrentScreen, userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (choosedItem) {
      setPaymentInfo({
        id: choosedItem.id,
        price: choosedItem.price,
        ac: choosedItem.ac,
        days: choosedItem.days,
      });
    }
  }, [choosedItem]);

  // TODO faire le fichier _error (et check si il y'en a pas un autre)
  // TODO FAire une page legals ?
  // TODO Résoudre pb de build en prod mode
  // TODO Essayer de re résoudre PB socket

  return (
    <Modal
      centered
      show={show}
      onHide={hideAndResetModal}
      size="lg"
    >
      <div style={{ height: 300 }} className="d-flex justify-content-center align-items-center">
        <ModalScreenWrapper
          Screen={Login}
          visibility={(currentScreen === MODAL_SCREEEN.LOGIN)}
          setScreen={setCurrentScreen}
          setPaymentInfo={setPaymentInfo}
          paymentInfo={paymentInfo}
        />
        <ModalScreenWrapper
          visibility={(currentScreen === MODAL_SCREEEN.PLAYERID)}
          Screen={PlayerID}
          setScreen={setCurrentScreen}
          backTo={MODAL_SCREEEN.LOGIN}
          setPaymentInfo={setPaymentInfo}
        />
        <ModalScreenWrapper
          visibility={(currentScreen === MODAL_SCREEEN.INNFORMATION)}
          Screen={Information}
          setScreen={setCurrentScreen}
          backTo={MODAL_SCREEEN.LOGIN}
          setPaymentInfo={setPaymentInfo}
        />
        <ModalScreenWrapper
          visibility={(currentScreen === MODAL_SCREEEN.PAYMENT)}
          Screen={Payment}
          setScreen={setCurrentScreen}
          backTo={MODAL_SCREEEN.INNFORMATION}
          setPaymentInfo={setPaymentInfo}
          paymentInfo={paymentInfo}
        />
        <ModalScreenWrapper
          visibility={(currentScreen === MODAL_SCREEEN.LOADING)}
          Screen={Loading}
        />
        <ModalScreenWrapper
          visibility={(currentScreen === MODAL_SCREEEN.SUCCESS)}
          Screen={Success}
          paymentInfo={paymentInfo}
        />
        <ModalScreenWrapper
          visibility={(currentScreen === MODAL_SCREEEN.ERROR)}
          Screen={Error}
          hide={hideAndResetModal}
        />
      </div>
    </Modal>
  );
}
