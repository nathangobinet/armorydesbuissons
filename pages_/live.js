import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';

import InfoCards from '../components/live/InfoCards';
import LiveInfo from '../components/live/LiveInfo';
import NewsGraphs from '../components/live/NewsGraphs';
import RankingChampions from '../components/live/RankingChampions';
import Statistics from '../components/live/Statistics';
import { PlayerPopper } from '../components/live/PlayerPopper';

function Live() {
  const [socket, setSocket] = useState(false);

  useEffect(() => {
    setSocket(io('ws://localhost:3005'));
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.close();
      }
    };
  }, []);

  return (
    <div>
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
