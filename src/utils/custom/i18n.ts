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

export default i18next;
