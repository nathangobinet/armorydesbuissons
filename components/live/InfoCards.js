import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfoCard from './InfoCard';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function InfoCards() {
  const [infos, setInfos] = useState({
    kills: 8000, online: 26, unique: 115, ranked: 2000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setInfos((crtIinfos) => ({
        kills: crtIinfos.kills + randomIntFromInterval(0, 3),
        online: (randomIntFromInterval(0, 1) === 1)
          ? crtIinfos.online + randomIntFromInterval(0, 2)
          : crtIinfos.online - randomIntFromInterval(0, 2),
        unique: crtIinfos.unique + randomIntFromInterval(0, 2),
        ranked: crtIinfos.ranked + randomIntFromInterval(0, 5),
      }));
    }, 1500);

    return (() => { clearInterval(interval); });
  }, []);

  const { t } = useTranslation('common');

  return (
    <section className="py-2" id="info-cards">
      <div className="row">
        <InfoCard bg="card-primary" icon="fa-skull" number={infos.kills} description={t('live.infoCards.kills')} />
        <InfoCard bg="card-accent" icon="fa-users" number={infos.online} description={t('live.infoCards.player')} />
        <InfoCard bg="card-primary" icon="fa-user-clock" number={infos.unique} description={t('live.infoCards.unique')} />
        <InfoCard bg="card-accent" icon="fa-medal" number={infos.ranked} description={t('live.infoCards.ranked')} />
      </div>
    </section>
  );
}

export default InfoCards;
