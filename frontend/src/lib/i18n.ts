import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { i18nConfig } from "@/../i18n-config";
import id from "@/translations/id.json";
import en from "@/translations/en.json";
import ja from "@/translations/ja.json";

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: typeof i18n
) {
  i18nInstance = i18nInstance || createInstance();
  i18nInstance.use(initReactI18next);

  const detectionOptions = {
    order: ["cookie"],
    lookupFromPathIndex: 1,
    lookupCookie: "i18next",
  };

  const resources = {
    en: en,
    id: id,
    ja: ja,
  };

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    detection: detectionOptions,
  });
  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
