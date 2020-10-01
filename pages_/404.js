/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next-translate/Link';
import React from 'react';
import DynamicNamespaces from 'next-translate/DynamicNamespaces';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Head from 'next/head';

import i18nConfig from '../i18n.json';

const { allLanguages, defaultLanguage } = i18nConfig;

function useLangFromRouter() {
  const { asPath } = useRouter();

  return allLanguages.reduce((result, l) => {
    if (new RegExp(`(^/${l}/)|(^/${l}$)`).test(asPath)) return l;
    return result;
  }, defaultLanguage);
}

function Custom404Content() {
  const { t } = useTranslation();
  return (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center ">
      <Head>
        <title>{t('common:404.head.title')}</title>
        <meta name="description" content={t('common:404.head.description')} />
      </Head>
      <div className="text-center">
        <div className="d-flex flex-column flex-sm-row align-items-center mb-4">
          <h1 className="mb-3 mb-sm-0 mr-0 mr-sm-4">{t('common:404.title')}</h1>
          <div>{t('common:404.text')}</div>
        </div>
        <Link href="/">
          <a className="btn btn-primary">{t('common:404.btn')}</a>
        </Link>
      </div>
    </div>
  );
}

export default function Custom404() {
  const lang = useLangFromRouter();
  return (
    <DynamicNamespaces
      dynamic={(_, ns) => require(`../locales/${lang}/${ns}.json`)}
      namespaces={['common']}
      fallback="Loading..."
    >
      <Custom404Content />
    </DynamicNamespaces>
  );
}
