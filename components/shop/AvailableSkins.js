/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useTransition, animated } from 'react-spring';

import styles from '../../styles/Shop.module.css';
import useFetch from '../../helpers/useFetch';

function useAudio(sound) {
  const [audio] = useState(new Audio(require(`../../public/sounds/striders/${sound}`)));
  audio.volume = 0.1;
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  },
  [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.pause();
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
}

function Siren({ sound }) {
  const [isPlay, toggle] = (sound) ? useAudio(sound) : [false, () => false];
  function getFaIcon() {
    if (!sound) return 'fa-times';
    if (isPlay) return 'fa-pause';
    return 'fa-play';
  }
  return (
    <div className="d-flex align-items-center flex-column flex-sm-row  justify-content-center">
      <button
        type="button"
        className={`btn ${styles.chevron} ${styles.litle} mr-0 mr-sm-3 my-2 my-sm-0 mb-sm-0 ${(sound) ? 'bg-primary' : ''}`}
        onClick={toggle}
        disabled={sound === undefined}
      >
        <i className={`fas ${getFaIcon()}`} />
      </button>
      {
        (sound)
          ? <div>Sirens are available for this skin</div>
          : <div>Sirens are not available for this skin</div>
      }
    </div>
  );
}

function SkinImage({ image, sound, path }) {
  const description = (/.*(?=(.PNG|.png))/).exec(image)[0];
  return (
    <div className="px-3 position-relative mx-auto" style={{ maxWidth: '450px' }}>
      <img src={require(`../../public/images/striders/${path}/${image}`)} alt={description} className="img-fluid mb-4 drop-shadow" />
      <div style={{ fontSize: '1.5rem' }} className="mb-0 font-weight-bold">{description}</div>
      <Siren sound={sound} />
    </div>
  );
}

function ImageHandler({
  skins, current, path, onChange,
}) {
  const [previousTab, setPreviousTab] = useState(current);

  let way;
  if (current - previousTab === skins.length - 1) way = -1;
  else if (current - previousTab === -(skins.length - 1)) way = 1;
  else way = (current - previousTab);

  const transitions = useTransition(skins[current], (p) => p.skin, {
    from: { opacity: 0, transform: `translate3d(${-way * 50}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: `translate3d(${way * 50}%,0,0)` },
  });
  if (current !== previousTab) setPreviousTab(current);

  return (
    <div className="d-flex justify-content-around align-items-center py-5">
      <button
        type="button"
        style={{ zIndex: 1 }}
        aria-label="Previous"
        className={`btn ${styles.chevron} flex-shrink-0`}
        onClick={() => onChange(-1)}
        onKeyPress={() => onChange(-1)}
      >
        <i className="fas fa-chevron-left" />
      </button>
      <div className="d-flex align-items-center" style={{ height: '400px', width: '50%', position: 'relative' }}>
        {
          transitions.map(({ item, props, key }) => (
            <animated.div
              key={key}
              style={{ ...props, position: 'absolute', width: '100%' }}
            >
              <SkinImage
                path={path}
                sound={item.sound}
                image={item.skin}
              />
            </animated.div>
          ))
        }
      </div>
      <button
        type="button"
        style={{ zIndex: 1 }}
        aria-label="Next"
        className={`btn ${styles.chevron} flex-shrink-0`}
        onClick={() => onChange(1)}
        onKeyPress={() => onChange(1)}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}

function VipSkins({ skins, path }) {
  const [current, setCurrent] = useState(0);

  const changeImage = (change) => {
    if ((change === 1) && (current + change >= skins.length)) setCurrent(0);
    else if ((change === -1) && (current + change < 0)) setCurrent(skins.length - 1);
    else setCurrent((crt) => crt + change);
  };

  return skins
    ? <ImageHandler skins={skins} path={path} current={current} onChange={changeImage} />
    : <div>Loading...</div>;
}

export default function AvailableSkin() {
  const skins = useFetch('/api/skins', false);
  const { t } = useTranslation();
  return (
    <section id="other-donation" className="container pt-5">
      <div className="text-center py-4">
        <h1 className="text-accent mb-4">{t('common:shop.availableSkins.title')}</h1>
        <p className="mb-5">{t('common:shop.availableSkins.p1')}</p>
        <h3 className="text-accent">{t('common:shop.availableSkins.t2')}</h3>
        <p>{t('common:shop.availableSkins.p1')}</p>
        <VipSkins path="vip" skins={(skins) ? skins.vip : false} />
        <h3 className="text-accent">{t('common:shop.availableSkins.t3')}</h3>
        <p>{t('common:shop.availableSkins.p2')}</p>
        <VipSkins path="rank" skins={(skins) ? skins.rank : false} />
        <h3 className="text-accent">{t('common:shop.availableSkins.t4')}</h3>
        <p>{t('common:shop.availableSkins.p3')}</p>
        <VipSkins path="custom" skins={(skins) ? skins.custom : false} />
      </div>
    </section>
  );
}
