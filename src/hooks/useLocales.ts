import { useTranslation } from 'react-i18next';
// @mui
import { enUS, viVN } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'Eng',
    value: 'en',
    systemValue: enUS,
    flag: '/assets/icons/ic_flag_en.svg',
  },
  {
    label: 'Vie',
    value: 'vi',
    systemValue: viVN,
    flag: '/assets/icons/ic_flag_vn.svg',
  },
];

export default function useLocales() {
  const { i18n, t: translate, t } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang, () => console.log('Changed language'));
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
    t,
  };
}
