import React from 'react';
import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';

import VideoBackground from '../components/home/VideoBackground';
import Features from '../components/home/Features';
import TpIntoFight from '../components/home/TpIntoFight';
import ChooseYourGameplay from '../components/home/ChooseYourGameplay';
import Versus from '../components/home/Versus';
import Ranking from '../components/home/Ranking';
import AtackDefense from '../components/home/AtackDefense';
import More from '../components/home/More';
import Quests from '../components/home/Quests';

function Home() {
  return (
    <div className="h-100">
      <Navbar transparent />
      <VideoBackground />
      <Features />
      <TpIntoFight />
      <ChooseYourGameplay />
      <Versus />
      <Ranking />
      <Quests />
      <AtackDefense />
      <More />
      <Footer />
    </div>
  );
}

export default Home;
