import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import translationPolish from "./locales/pl/translation.json"
import translationEnglish from "./locales/en/translation.json"
import LanguageDetector from 'i18next-browser-languagedetector';


export const languageResources ={
    en: {

        login: translationPolish.pages.login,
    },
    pl: {
        login: translationEnglish.pages.login,
    }
}
const options = {
    order: ['querystring', 'navigator'],
    lookupQuerystring: 'lng'
}


i18n.use(initReactI18next).use(LanguageDetector).init({
    supportedLngs: ['pl', 'en'],
    detection: options,
    fallbackLng: 'en',
    resources: languageResources


});

i18n.changeLanguage()
export default i18n;