import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import translationPolish from "./locales/pl/translation.json"
import translationEnglish from "./locales/en/translation.json"
import LanguageDetector from 'i18next-browser-languagedetector';


export const languageResources ={
    en: {
        login: translationEnglish.pages.login,
        resources: translationEnglish.pages.resources,
        userMenu: translationEnglish.userMenu,
        drawer: translationEnglish.drawer,
        projects: translationEnglish.pages.projects,
        overall: translationEnglish.pages,
        table: translationEnglish.table,
        buttons: translationEnglish.pages.buttons,
        members: translationEnglish.pages.members,
        forms: translationEnglish.pages.forms,
        userManagement: translationEnglish.pages.userManagement,
        environments: translationEnglish.pages.environments,
        activity: translationEnglish.pages.activities,
        userProfile: translationEnglish.pages.userProfile,
    },
    pl: {
        login: translationPolish.pages.login,
        resources: translationPolish.pages.resources,
        drawer: translationPolish.drawer,
        userMenu: translationPolish.userMenu,
        projects: translationPolish.pages.projects,
        overall: translationPolish.pages,
        table: translationPolish.table,
        buttons: translationPolish.pages.buttons,
        members: translationPolish.pages.members,
        forms: translationPolish.pages.forms,
        userManagement: translationPolish.pages.userManagement,
        environments: translationPolish.pages.environments,
        activity: translationPolish.pages.activities,
        userProfile: translationPolish.pages.userProfile,
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


}).then();

i18n.changeLanguage().then()
export default i18n;