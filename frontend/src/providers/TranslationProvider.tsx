"use client";

import { I18nextProvider } from "react-i18next";
import initTranslations from "@/lib/i18n";
import { createInstance, Resource } from "i18next";
import React from "react";

type Props = {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
};

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
}: Props) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
