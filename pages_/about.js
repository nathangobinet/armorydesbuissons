import React from 'react';
import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/footer/Footer';
import Summary from '../components/about/Summary';
import Rules from '../components/about/Rules';
import Team from '../components/about/Team';
import Contact from '../components/about/Contact';
import Rank from '../components/about/Rank';
import Vip from '../components/about/Vip';
import Shortcuts from '../components/about/Shortcuts';

export default function About() {
  return (
    <div>
      <Navbar />
      <Summary />
      <Rules />
      <Team />
      <Contact />
      <Rank />
      <Vip />
      <Shortcuts />
      <Footer />
    </div>
  );
}

About.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});
