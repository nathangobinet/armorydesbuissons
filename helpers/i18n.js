import { resolve } from 'path';
import NextI18Next from 'next-i18next';

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  browserLanguageDetection: true,
  cleanCode: true,
  defaultNS: 'common',
  fallbackLng: 'en',
  otherLanguages: ['fr'],
  localePath: resolve('./public/locales'),
});
