import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HOME_EN from '../locales/en/home.json';
import HOME_VI from '../locales/vi/home.json';

export const locales = {
  en: {
    flag: '/assets/icons/ic_flag_en.svg',
    value: 'Eng',
    label: 'en',
  },
  vi: {
    flag: '/assets/icons/ic_flag_vn.svg',
    value: 'Vie',
    label: 'vi',
  },
} as const;

export const resources = {
  en: {
    home: HOME_EN,
  },
  vi: {
    home: HOME_VI,
  },
};

export const defaultNS = 'home';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['home'],
  defaultNS,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
