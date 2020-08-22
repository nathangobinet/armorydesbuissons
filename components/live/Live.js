import React from 'react';
import Navbar from '../Common/Navbar/Navbar';
import Footer from '../Common/Footer/Footer';

import './Live.css';

import InfoCards from './InfoCards';
import LiveInfo from './LiveInfo';
import NewsGraphs from './NewsGraphs';
import RankingChampions from './RankingChampions';
import Statistics from './Statistics';
import { PlayerPopper } from './PlayerPopper';

function Live() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid p-4">
        <InfoCards />
        <LiveInfo />
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
