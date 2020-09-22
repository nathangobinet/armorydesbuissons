/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next-translate/Link';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import config from '../../helpers/config';
import { useAuth } from '../../helpers/user';
import DiscordQuestModal from './DiscordQuestModal';

function BannerContent(props) {
  const {
    button, text, href, onClick, color, badge, external,
  } = props;

  const ButtonType = () => {
    const commonClasses = 'mr-0 mr-sm-3 mb-3 mb-sm-0';
    const btnClasses = `btn btn-${color || 'primary'} px-5 mr-0 mr-sm-3 mb-3 mb-sm-0`;
    if (!button && badge) return <div style={{ fontSize: 20 }} className={`badge badge-${color} py-2 px-3 badge ${commonClasses}`}>{badge}</div>;
    if (!href && onClick) return <button className={btnClasses} type="button" onClick={onClick}>{button}</button>;
    if (external) return <a className={btnClasses} href={href}>{button}</a>;
    return <Link href={href}><a className={btnClasses}>{button}</a></Link>;
  };

  return (
    <div className="d-flex flex-column flex-sm-row text-center text-sm-left align-items-center">
      <ButtonType />
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
        type="external"
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
        href="/shop#pricing"
      />
    );
  }
  return (
    <BannerContent
      text="Thank you very much for helping the server ♥. It is thanks to you that the server can continue to exist."
      badge="You are VIP"
      color="primary"
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
