/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import '../styles/globals.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

import { isDarkMode, setDarkMode } from '../helpers/theme';
import { loadUser } from '../helpers/user';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setDarkMode(isDarkMode());
    loadUser();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
