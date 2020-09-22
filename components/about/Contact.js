import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import transparentShape1 from '../../public/svgs/shapes/transparentshape1.svg';
import transparentShape2 from '../../public/svgs/shapes/transparentshape2.svg';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact">
      <div className="bg-primary-or-dark">
        <div className="d-flex h-100">
          <div className="d-flex w-100" style={{ overflow: 'hidden' }}>
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-start mb-auto" alt="" src={transparentShape1} />
            <img style={{ userSelect: 'none' }} className="img-fluid align-self-end m-0" alt="" src={transparentShape2} />
          </div>
          <div className="w-100 h-100 py-4" style={{ marginLeft: '-100%' }}>
            <div className="container py-5">
              <div className="text-center">
                <h1 className="mb-5 text-white">{t('about:contact.title')}</h1>
              </div>
              <div className="row text-center">
                <div className="col-md-6">
                  <div className="card my-3 shadow">
                    <h4 className="text-accent mb-3">{t('about:contact.join.title')}</h4>
                    <p>{t('about:contact.join.p1')}</p>
                    <p>{t('about:contact.join.p2')}</p>
                    <a className="btn btn-discord mt-2 w-75 mx-auto" href="https://discord.gg/RUh4QUV" target="_blank" rel="noreferrer">
                      <i className="fab fa-discord mr-2" />
                      {t('about:contact.join.btn')}
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card my-3 shadow">
                    <h4 className="text-accent mb-3">{t('about:contact.contact.title')}</h4>
                    <p>{t('about:contact.contact.p1')}</p>
                    <p>{t('about:contact.contact.p2')}</p>
                    <a className="btn btn-mail mt-2 w-75 mx-auto" href="mailto:armorydesbuissons@gmail.com">
                      <i className="fas fa-envelope mr-2" />
                      {t('about:contact.contact.btn')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
