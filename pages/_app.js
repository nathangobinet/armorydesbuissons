import App from 'next/app';
import React, { useEffect } from 'react';
import '../styles/globals.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

import { isDarkMode, setDarkMode } from '../helpers/theme';
import { appWithTranslation, i18n } from '../helpers/i18n';
import { storeLanguage } from '../helpers/language';
import { loadUser } from '../helpers/user';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    setDarkMode(isDarkMode());
    storeLanguage(i18n.language);
    loadUser();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...pageProps} />
  );
};

MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) });

export default appWithTranslation(MyApp);
