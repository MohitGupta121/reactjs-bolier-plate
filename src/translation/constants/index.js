import {TRANSLATIONS_EN} from '../en';
import {TRANSLATIONS_FR} from '../fr';

export const resources = {
  en: {
    translation: TRANSLATIONS_EN,
    label: 'English',
  },
  fr: {
    translation: TRANSLATIONS_FR,
    label: 'French',
  },
};

export const allLanguages = Object.keys(resources).map((key) => {
  return {
    value: key,
    label: resources[key].label,
  };
});
