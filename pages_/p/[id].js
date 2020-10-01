import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Navbar from '../../components/common/navbar/Navbar';
import Footer from '../../components/common/footer/Footer';
import InformationBanner from '../../components/player/InformationBanner';
import useFetch from '../../helpers/useFetch';
import InfoCards from '../../components/player/InfoCards';
import RankingLevel from '../../components/player/RankingLevel';
import Statistic from '../../components/player/Statistic';
import ResetGraph from '../../components/player/ResetGraph';
import PurchasesWallet from '../../components/player/PurchasesWallet';

export default function Player() {
  const { t } = useTranslation();
  const router = useRouter();
  const profileFetch = useFetch('/playerInfo', false, { id: router.query.id }, false);
  const [profileInfo, setProfileInfo] = useState(false);

  useEffect(() => {
    setProfileInfo(profileFetch);
  }, [profileFetch]);

  return (
    <div>
      <Head>
        <title>{`${profileInfo ? `${profileInfo.lastName} - ` : ''}${t('player:head.title')}`}</title>
        <meta
          name="description"
          content={`${t('player:head.description')} ${profileInfo ? `${t('player:head.thePlayer')} ${profileInfo.lastName}` : t('player:head.players')}`}
        />
      </Head>
      <Navbar />
      <div className="container-fluid p-4">
        <InformationBanner profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
        <InfoCards profileInfo={profileInfo} />
        <RankingLevel profileInfo={profileInfo} />
        <Statistic profileInfo={profileInfo} />
        {
          profileInfo && profileInfo.isItsProfile
            ? (
              <div>
                <ResetGraph profileInfo={profileInfo} />
                <PurchasesWallet profileInfo={profileInfo} />
              </div>
            ) : ''
        }
      </div>
      <Footer />
    </div>
  );
}
