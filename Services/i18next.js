import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from '../locals/en.json'
import beng from "../locals/beng.json"
import hin from "../locals/hin.json"

export const LanguageResources={
    en:{translation:en},
    beng:{translation:beng},
    hin:{translation:hin}
}
i18next.use(initReactI18next).init({
    compatibilityJSON:'v3',
    lng:'en',
    fallbackLng:'en',
    resources:LanguageResources
});

export default i18next