/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import DynamicNamespaces from 'next-translate/DynamicNamespaces';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import i18nConfig from '../i18n.json';
import CustomHeader from '../components/common/CustomHeader';

const { allLanguages, defaultLanguage } = i18nConfig;

function useLangFromRouter() {
  const { asPath } = useRouter();

  return allLanguages.reduce((result, l) => {
    if (new RegExp(`(^/${l}/)|(^/${l}$)`).test(asPath)) return l;
    return result;
  }, defaultLanguage);
}

function Custom404Content({ lang }) {
  const { t } = useTranslation();
  return (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center ">
      <CustomHeader title={t('common:404.head.title')} description={t('common:404.head.description')} />
      <div className="text-center">
        <div className="d-flex flex-column flex-sm-row align-items-center mb-4">
          <h1 className="mb-3 mb-sm-0 mr-0 mr-sm-4">{t('common:404.title')}</h1>
          <div>{t('common:404.text')}</div>
        </div>
        <Link href={`/${lang === 'en' ? '' : lang}`}>
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
      dynamic={(_, ns) => require(`../public/locales/${lang}/${ns}.json`)}
      namespaces={['common']}
      fallback="Loading..."
    >
      <Custom404Content lang={lang} />
    </DynamicNamespaces>
  );
}
