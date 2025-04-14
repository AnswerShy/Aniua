import { i18n } from '../customUtils';

const getTranslatedText = (inPath: string, key: string) => {
  const translated = i18n.t(`${inPath}.${key.toLowerCase()}`);
  return translated !== `${inPath}.${key.toLowerCase()}`
    ? translated
    : key.charAt(0).toUpperCase() + key.slice(1); // Check if translation exists, else fallback
};

export default getTranslatedText;
