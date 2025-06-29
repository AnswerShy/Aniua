import i18next from 'i18next';
import ua from '@/locales/ua.json';

i18next.init({
  lng: 'uk',
  debug: false,
  resources: {
    uk: {
      translation: ua,
    },
  },
});

const getTranslatedText = (path: string, option?: Record<string, string | number>) => {
  const translated = i18next.t(path, option);
  return translated !== path ? translated : path.charAt(0).toUpperCase() + path.slice(1);
};

export default getTranslatedText;
