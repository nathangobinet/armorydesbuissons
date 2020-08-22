import React from 'react';

import styles from '../../styles/Home.module.css';

import video from '../../public/videos/compilation.mp4';
import videoPoster from '../../public/videos/poster.png';
import logo from '../../public/svgs/logo-gr.svg';

function VideoBackground() {
  return (
    <section className={styles['full-page-section']} id="videobackground">
      <div className={styles['section-content']}>
        <div className="container h-100">
          <video poster={videoPoster} className={styles.bgvid} playsInline autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
          <div className="d-flex flex-column justify-content-center h-100 pt-5">
            <div className="m-auto">
              <img src={logo} alt="Armory des buissons logo" className={styles['logo-front-page']} />
            </div>
            <div className="align-self-center m-0 mb-5">
              <a className={`${styles['fp-caret-down']} opacity-interaction`} href="#features" alt="Next section">
                <i className="fa fa-caret-down pulse" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoBackground;
