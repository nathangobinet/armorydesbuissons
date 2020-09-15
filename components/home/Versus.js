import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../styles/Home.module.css';
import shape1 from '../../public/svgs/shapes/transparentshape1.svg';
import shape2 from '../../public/svgs/shapes/transparentshape2.svg';
import users from '../../public/svgs/icons/users.svg';
import points from '../../public/svgs/icons/points.svg';
import location from '../../public/svgs/icons/location.svg';

function Versus() {
  const { t } = useTranslation();
  return (
    <section id="versus" className={`${styles['full-page-section']} bg-accent-or-dark`}>
      <div className={styles['section-content']}>
        <div className="d-flex h-100">
          <div className="d-flex h-100 w-100" style={{ overflow: 'hidden' }}>
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-start mb-auto" src={shape1} alt="Shape" />
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-end m-0" src={shape2} alt="Shape" />
          </div>
          <div className="w-100 h-100" style={{ marginLeft: '-100%' }}>
            <div className="container d-flex flex-column justify-content-center h-100 py-5">
              <div className="my-auto">
                <h1 className="text-white text-center mb-5 pb-lg-5">
                  {t('common:home.versus.title')}
                </h1>
                <div className="row">
                  <div className="col-lg-4 px-lg-4 pb-4 pb-lg-0">
                    <div className="card shadow bt-primary">
                      <div className="text-center">
                        <div className="py-4 mx-auto">
                          <img src={users} width="100px" alt="Users" />
                        </div>
                        <h4 className="text-primary">
                          {t('common:home.versus.card1.title')}
                        </h4>
                        <p>
                          {t('common:home.versus.card1.sub')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 px-lg-4 pt-lg-5 pb-4 pb-lg-0">
                    <div className="card shadow bt-primary">
                      <div className="text-center">
                        <div className="py-4 mx-auto">
                          <img src={points} width="100px" alt="Points" />
                        </div>
                        <h4 className="text-primary">
                          {t('common:home.versus.card2.title')}
                        </h4>
                        <p>
                          {t('common:home.versus.card2.sub')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 px-lg-4">
                    <div className="card shadow bt-primary">
                      <div className="text-center">
                        <div className="py-4 mx-auto">
                          <img src={location} width="70px" alt="Location" />
                        </div>
                        <h4 className="text-primary">
                          {t('common:home.versus.card3.title')}
                        </h4>
                        <p>
                          {t('common:home.versus.card3.sub')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="align-self-center m-0">
                <a className={`${styles['fp-caret-down']} text-white-or-accent opacity-interaction`} label="Go to next section" href="#ranking">
                  <i className={`fas fa-caret-down ${styles.pulse}`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Versus;
