import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import useTranslation from 'next-translate/useTranslation';

import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';
import InfoCards from '../components/live/InfoCards';
import LiveInfo from '../components/live/LiveInfo';
import NewsGraphs from '../components/live/NewsGraphs';
import RankingChampions from '../components/live/RankingChampions';
import Statistics from '../components/live/Statistics';
import { PlayerPopper } from '../components/live/PlayerPopper';
import config from '../helpers/config';
import CustomHeader from '../components/common/CustomHeader';

// Workaround to access the socket inside componentWillUnmount
let socketSave;

function Live() {
  const { t } = useTranslation();
  const [socket, setSocket] = useState(false);

  socketSave = socket;

  useEffect(() => {
    setSocket(io(config.domain, { path: `${config.apiPath}/socket.io` }));
    return () => {
      if (socketSave) {
        socketSave.removeAllListeners();
        socketSave.close();
      }
    };
  }, []);

  return (
    <div>
      <CustomHeader title={t('live:head.title')} description={t('live:head.description')} />
      <Navbar />
      <div className="container-fluid p-4">
        <InfoCards socket={socket} />
        <LiveInfo socket={socket} />
        <NewsGraphs />
        <RankingChampions />
        <Statistics />
      </div>
      <PlayerPopper />
      <Footer />
    </div>
  );
}

export default Live;
