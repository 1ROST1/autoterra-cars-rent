import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationRO from './locales/ro.json';
import translationRU from './locales/ru.json';
import translationEN from './locales/en.json';
import { DEFAULT_LANGUAGE } from './constants/languages';

const resources = {
    ro: {
        translation: translationRO
    },
    ru: {
        translation: translationRU
    },
    en: {
        translation: translationEN
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: DEFAULT_LANGUAGE,
        debug: false,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            lookupFromPathIndex: 0,
            caches: ['localStorage']
        }
    });

export default i18n;
