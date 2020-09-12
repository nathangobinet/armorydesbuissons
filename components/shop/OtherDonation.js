import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../styles/Shop.module.css';

function Info({ icon, title, children }) {
  return (
    <div className="card my-3 shadow bg-lighter">
      <div className="d-flex flex-column flex-sm-row align-items-center ">
        <div className=" mr-0 ml-sm-3 mr-sm-4 ml-lg-4 mr-lg-5 flex-shrink-0 mb-sm-0 mb-3">
          <span className={`${styles['round-primary']} ${styles.big}`}><i className={`fas ${icon}`} /></span>
        </div>
        <div className="w-100 text-center text-sm-left flex-shrink-1">
          <h4 className="text-accent mb-2">{title}</h4>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function OtherDonation() {
  const { t } = useTranslation('common');
  return (
    <section id="other-donation" className="container py-5">
      <div className="text-center py-4">
        <h1 className="text-accent mb-4">{t('shop.otherDonation.title')}</h1>
      </div>
      <div>
        <Info icon="fa-hands-helping" title="Free donation">
          <p>You can also donate the amount of your wish.</p>
          <p>
            This donation does not offer any In-Game advantage
            {' '}
            , but allows us to continue to develop and to offer you a better gaming experience.
          </p>
          <form className="text-center" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="2KSCXQ7WS7LMC" />
            <input type="image" src="https://www.paypalobjects.com/en_US/FR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_FR/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </Info>
        <Info icon="fa-paint-roller" title="Custom skin">
          <p>
            It is possible to order a personalized and individual skin.
            {' '}
            This skin will be made to measure according to your requests.
            {' '}
            It is also possible to provide us with the skin you want. The price is €25,00.
          </p>
          <p>
            Please contact a founder for more details on order and payment terms.
          </p>
        </Info>
      </div>
    </section>
  );
}
