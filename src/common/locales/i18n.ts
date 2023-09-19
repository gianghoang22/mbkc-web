import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import viLocales from './vi.json';
import enLocales from './en.json';

import vi from './vi/index';
import en from './en/index';

export const resources = {
  en: { translations: { ...enLocales, ...en } },
  vi: { translations: { ...viLocales, ...vi } },
};

export const defaultNS = 'translations';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
