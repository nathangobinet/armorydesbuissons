/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next-translate/Link';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation();
  const user = useAuth();
  if (profileInfo === false) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (profileInfo === undefined) {
    return (
      <BannerContent
        text={t('player:informationBanner.neverConnected.text')}
        badge={t('player:informationBanner.neverConnected.title')}
        color="danger"
      />
    );
  }
  if (!user.auth) {
    return (
      <BannerContent
        button={t('player:informationBanner.steamConnect.title')}
        text={t('player:informationBanner.steamConnect.text')}
        href={`${config.httpserver}/api/auth/steam`}
        external
      />
    );
  }
  if (!profileInfo.isItsProfile) {
    return (
      <BannerContent
        button={t('player:informationBanner.goProfile.title')}
        text={t('player:informationBanner.goProfile.text')}
        href={`/p/${user.id}`}
      />
    );
  }
  if (!profileInfo.isDiscordQuestAchieved) {
    return (
      <BannerContent
        button={t('player:informationBanner.discordQuest.title')}
        text={t('player:informationBanner.discordQuest.text')}
        color="discord"
        onClick={() => { setDiscordModalVisible(true); }}
      />
    );
  }
  if (!profileInfo.isVip) {
    return (
      <BannerContent
        button={t('player:informationBanner.helpServer.title')}
        text={t('player:informationBanner.helpServer.text')}
        href="/shop#pricing"
      />
    );
  }
  return (
    <BannerContent
      text={t('player:informationBanner.vip.text')}
      badge={t('player:informationBanner.vip.title')}
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
