/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import config from '../../helpers/config';
import { useAuth } from '../../helpers/user';
import DiscordQuestModal from './DiscordQuestModal';

function BannerContent(props) {
  const {
    button, text, href, onClick, color, badge,
  } = props;
  return (
    <div className="d-flex align-items-center">
      {
        button ? (
          (href)
            ? <a className="btn btn-primary px-5 mr-3" href={href}>{button}</a>
            : <button className={`btn btn-${color || 'primary'} px-5 mr-3`} type="button" onClick={onClick}>{button}</button>
        ) : <div style={{ fontSize: 20 }} className="badge badge-primary py-2 px-3 badge mr-3">{badge}</div>
      }
      <b>{text}</b>
    </div>
  );
}

function BannerChooser({ profileInfo, setDiscordModalVisible }) {
  const user = useAuth();
  if (!profileInfo) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (!user.auth) {
    return (
      <BannerContent
        button="Connect with steam"
        text="To view your full profile, see your rankings, statistics, graphs and more..."
        href={`${config.httpserver}/api/auth/steam`}
      />
    );
  }
  if (!profileInfo.isItsProfile) {
    return (
      <BannerContent
        button="Go to your profile"
        text="To view your full profile, see your rankings, statistics, graphs and more..."
        href={`/p/${user.id}`}
      />
    );
  }
  if (!profileInfo.isDiscordQuestAchieved) {
    return (
      <BannerContent
        button="Complete the discord quest"
        text="To gain XP and help you get through the levels."
        color="discord"
        onClick={() => { setDiscordModalVisible(true); }}
      />
    );
  }
  if (!profileInfo.isVip) {
    return (
      <BannerContent
        button="Help the server"
        text="By becoming VIP and unlocking exceptional visuals to set you apart from other players."
        onclick={() => {}}
      />
    );
  }
  return (
    <BannerContent
      text="Thank you very much for helping the server ♥. It is thanks to you that the server can continue to exist."
      badge="You are VIP"
    />
  );
}

export default function InformationBanner({ profileInfo }) {
  const [discordModalVisible, setDiscordModalVisible] = useState(false);
  return (
    <section id="information-banner">
      <div className="row">
        <div className="col-12">
          <div className="card p-3 shadow">
            <BannerChooser
              profileInfo={profileInfo}
              setDiscordModalVisible={setDiscordModalVisible}
            />
          </div>
        </div>
      </div>
      <DiscordQuestModal
        discordModalVisible={discordModalVisible}
        setDiscordModalVisible={setDiscordModalVisible}
      />
    </section>
  );
}
