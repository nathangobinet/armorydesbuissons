import React from 'react';
import { useTranslation } from 'react-i18next';

import striderShape from '../../public/svgs/shapes/strider-shape.svg';
import soldierShape from '../../public/svgs/shapes/soldier-shape.svg';

function ChooseYourGameplay() {
  const { t } = useTranslation('common');
  return (
    <section id="choose-your-gameplay" className="full-page-section">
      <div className="section-content">
        <div className="container d-flex flex-column justify-content-center h-100 py-5">
          <div className="my-auto">
            <div className="mb-5 text-center" data-aos="fade">
              <h1>
                {t('home.chooseYourGameplay.title')}
              </h1>
              <h4>
                {t('home.chooseYourGameplay.subTitle')}
              </h4>
            </div>
            <div className="d-flex flex-column flex-md-row">
              <div className="px-md-4 align-self-end">
                <div className="mb-5">
                  <img className="img-fluid mx-auto d-block" src={striderShape} alt="Shape with striders" data-aos="fade-right" />
                </div>
                <div className="text-center px-md-4" data-aos="fade-up">
                  <h4 className="text-accent">
                    {t('home.chooseYourGameplay.striderTitle')}
                  </h4>
                  <p>
                    {t('home.chooseYourGameplay.striderParagraph')}
                  </p>
                </div>
              </div>
              <div className="px-md-4">
                <div className="mb-5">
                  <img className="img-fluid mx-auto d-block" src={soldierShape} alt="Shape with soldiers" data-aos="fade-left" />
                </div>
                <div className="text-center px-md-4" data-aos="fade-up">
                  <h4 className="text-primary">
                    {t('home.chooseYourGameplay.soldierTitle')}
                  </h4>
                  <p>
                    {t('home.chooseYourGameplay.soldierParagraph')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="align-self-center m-0">
            <a className="fp-caret-down opacity-interaction" label="Go to next section" href="#versus" data-aos="fade" data-aos-offset="0"><i className="fas fa-caret-down pulse" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChooseYourGameplay;
