/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Head from 'next/head';

import '../styles/globals.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import Router from 'next/router';

import { isDarkMode, setDarkMode } from '../helpers/theme';
import { loadUser } from '../helpers/user';
import { initLanguage } from '../helpers/language';

const GA_TRACKING_ID = 'UA-179011681-1';

function initGARouter() {
  Router.events.on(
    'routeChangeComplete',
    (url) => window.gtag(
      'config', GA_TRACKING_ID, { page_path: url },
    ),
  );
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGARouter();
    initLanguage();
    setDarkMode(isDarkMode());
    loadUser();
  }, []);
  return (
    <div className="h-100">
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
