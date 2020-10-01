import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Modal } from 'react-bootstrap';
import config from '../../helpers/config';
import { getUrlAction } from '../../helpers/user';

function ScreenSuccess({ setDiscordModalVisible }) {
  const { t } = useTranslation();
  return (
    <div style={{ maxWidth: 600 }} className="mx-auto text-center">
      <h3 className="text-accent mb-4">{t('player:informationBanner.discordModal.title')}</h3>
      <div className="my-3"><i className="fas fa-check fa-3x" /></div>
      <p className="mb-4">{t('player:informationBanner.discordModal.success')}</p>
      <button type="button" onClick={() => { setDiscordModalVisible(false); }} className="btn btn-primary mb-2">
        {t('player:informationBanner.discordModal.btnBack')}
        <i className="fas fa-chevron-right ml-4" />
      </button>
    </div>
  );
}

function ScreenError({ setDiscordModalVisible }) {
  const { t } = useTranslation();
  return (
    <div style={{ maxWidth: 600 }} className="mx-auto text-center">
      <h3 className="text-accent mb-4">{t('player:informationBanner.discordModal.title')}</h3>
      <div className="my-3"><i className="fas fa-times fa-3x" /></div>
      <p className="mb-4">{t('player:informationBanner.discordModal.error')}</p>
      <button type="button" onClick={() => { setDiscordModalVisible(false); }} className="btn btn-primary mb-2">
        {t('player:informationBanner.discordModal.btnBack')}
        <i className="fas fa-chevron-right ml-4" />
      </button>
    </div>
  );
}

function ScreenQuest() {
  const { t } = useTranslation();
  return (
    <div style={{ maxWidth: 600 }} className="mx-auto text-center">
      <h3 className="text-accent mb-4">{t('player:informationBanner.discordModal.title')}</h3>
      <div className="mb-4">
        <p>
          <b className="text-primary">1.</b>
          {' '}
          {t('player:informationBanner.discordModal.p1')}
        </p>
        <a className="btn btn-discord my-1" href="https://discord.gg/RUh4QUV" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord mr-3" />
          {t('player:informationBanner.discordModal.btnJoin')}
        </a>
      </div>
      <div>
        <p>
          <b className="text-primary">2.</b>
          {' '}
          {t('player:informationBanner.discordModal.p2')}
        </p>
        <a className="btn btn-discord my-1 mb-3" href={`${config.apiUrl}/auth/discord`}>
          <i className="fas fa-check mr-3" />
          {t('player:informationBanner.discordModal.btnCheck')}
        </a>
        <div style={{ maxWidth: 500, lineHeight: 1 }} className="mx-auto">
          <small>{t('player:informationBanner.discordModal.info')}</small>
        </div>
      </div>
    </div>
  );
}

function ScreenChooser({ screen, setDiscordModalVisible }) {
  if (screen === 'quest') return <ScreenQuest />;
  if (screen === 'success') return <ScreenSuccess setDiscordModalVisible={setDiscordModalVisible} />;
  return <ScreenError setDiscordModalVisible={setDiscordModalVisible} />;
}

export default function DiscordQuestModal({ discordModalVisible, setDiscordModalVisible }) {
  const [screen, setScreen] = useState('quest');

  useEffect(() => {
    const action = getUrlAction('discord');
    // Check if action and action info have id
    if (action.isAction) {
      if (action.info.result) {
        setScreen('success');
      } else {
        setScreen('error');
      }
      setDiscordModalVisible(true);
    }
  }, []);

  return (
    <Modal
      centered
      show={discordModalVisible}
      onHide={() => { setDiscordModalVisible(false); }}
      size="lg"
    >
      <ScreenChooser screen={screen} setDiscordModalVisible={setDiscordModalVisible} />
    </Modal>
  );
}
