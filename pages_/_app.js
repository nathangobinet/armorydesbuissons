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

Router.events.on(
  'routeChangeComplete',
  (url) => window.gtag(
    'config', GA_TRACKING_ID, { page_path: url },
  ),
);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
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
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#333333" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#333333" />
        <meta property="og:image" content="/images/meta/meta.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
