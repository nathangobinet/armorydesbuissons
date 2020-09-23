import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import config from '../../helpers/config';
import { getUrlAction } from '../../helpers/user';

function ScreenSuccess({ setDiscordModalVisible }) {
  return (
    <div style={{ maxWidth: 600 }} className="mx-auto text-center">
      <h3 className="text-accent mb-4">Discord Quest</h3>
      <div className="my-3"><i className="fas fa-check fa-3x" /></div>
      <p className="mb-4">
        You have completed the discord quest.
        {' '}
        Please log out and log back in to the game to see the changes.
      </p>
      <button type="button" onClick={() => { setDiscordModalVisible(false); }} className="btn btn-primary mb-2">
        Go back
        <i className="fas fa-chevron-right ml-4" />
      </button>
    </div>
  );
}

function ScreenError({ setDiscordModalVisible }) {
  return (
    <div style={{ maxWidth: 600 }} className="mx-auto text-center">
      <h3 className="text-accent mb-4">Discord Quest</h3>
      <div className="my-3"><i className="fas fa-times fa-3x" /></div>
      <p className="mb-4">
        An error occurred and the quest was not completed.
        {' '}
        Please try again and contact an administrator if this happens again.
      </p>
      <button type="button" onClick={() => { setDiscordModalVisible(false); }} className="btn btn-primary mb-2">
        Go back
        <i className="fas fa-chevron-right ml-4" />
      </button>
    </div>
  );
}

function ScreenQuest() {
  return (
    <div style={{ maxWidth: 600 }} className="mx-auto text-center">
      <h3 className="text-accent mb-4">Discord Quest</h3>
      <div className="mb-4">
        <p>
          <b className="text-primary">1.</b>
          {' '}
          Join our discord server by clicking on this button
        </p>
        <a className="btn btn-discord my-1" href="https://discord.gg/RUh4QUV" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord mr-3" />
          Join us
        </a>
      </div>
      <div>
        <p>
          <b className="text-primary">2.</b>
          {' '}
          When this is done, or if you are already a member,
          {' '}
          let us verify that you are indeed a member.
        </p>
        <a className="btn btn-discord my-1 mb-3" href={`${config.httpserver}/api/auth/discord`}>
          <i className="fas fa-check mr-3" />
          Check that I am a member
        </a>
        <div style={{ maxWidth: 500, lineHeight: 1 }} className="mx-auto">
          <small>
            Permission to see the servers you belong to will
            {' '}
            be immediately removed once the check is performed.
          </small>
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
