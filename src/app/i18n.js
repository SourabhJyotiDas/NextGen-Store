"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import enTranslation from "@/locales/en.json";
import asTranslation from "@/locales/as.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      as: { translation: asTranslation },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes data
    },
  });

export default i18n;
