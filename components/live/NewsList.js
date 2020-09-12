/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import useTranslation from 'next-translate/useTranslation';

import News from './News';
import useFetch from '../../helpers/useFetch';

import styles from '../../styles/Live.module.css';

export default function NewsList() {
  const news = useFetch('/api/news', []);
  const [toggle, setToggle] = useState(false);

  const animation = {
    transform: toggle ? 'scale(0,0)' : 'scale(1,1)',
    opacity: toggle ? 0 : 1,
  };

  const card1 = useSpring({ ...animation, delay: toggle ? 0 : 200 });
  const card2 = useSpring({ ...animation, delay: toggle ? 100 : 300 });
  const card3 = useSpring({ ...animation, delay: toggle ? 200 : 400 });
  const card4 = useSpring({ ...animation, delay: toggle ? 300 : 500 });

  const bigNews = useSpring({
    from: { opacity: toggle ? 0 : 1 },
    to: { opacity: toggle ? 1 : 0 },
    delay: toggle ? 500 : 0,
  });

  const { t } = useTranslation('common');

  return (
    <div className="col-xl-5 py-2">
      <div className="card card-primary shadow">
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="text-white mb-3">{t('live.news.title')}</h4>
          {toggle && (
            <button
              type="button"
              className="btn-link text-white"
              onClick={() => { setToggle(false); }}
            >
              <span className="mr-2"><i className="fa fa-chevron-left" /></span>
              {t('live.news.back')}
            </button>
          )}
        </div>
        <animated.div style={{ ...bigNews, zIndex: (toggle) ? 1 : 0 }} className={styles.bigNews}>
          <News news={news.find((n) => n.id === toggle)} setToggle={setToggle} fullWidth />
        </animated.div>
        <div>
          <div className="row">
            <div className="col-sm-6 py-2">
              <animated.div style={card1}>
                <News news={news[0]} setToggle={setToggle} />
              </animated.div>
            </div>
            <div className="col-sm-6 py-2">
              <animated.div style={card2}>
                <News news={news[1]} setToggle={setToggle} />
              </animated.div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 py-2">
              <animated.div style={card3}>
                <News news={news[2]} setToggle={setToggle} />
              </animated.div>
            </div>
            <div className="col-sm-6 py-2">
              <animated.div style={card4}>
                <News news={news[3]} setToggle={setToggle} />
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
