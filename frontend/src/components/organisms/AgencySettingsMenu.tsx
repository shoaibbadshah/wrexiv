"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18nConfig } from "@/../i18n-config";
import { useTranslation } from "react-i18next";

const navigations = [
  {
    labelKey: "agency",
    href: "/app/agency",
  },
  {
    labelKey: "agency-user",
    href: "/app/agency_user",
  },
];

const checkPathname = (pathname: string, href: string): boolean => {
  const languagePathRegex = new RegExp(
    `/app/(${i18nConfig.locales.join("|")})`
  );
  const pathnameWithoutLanguage = pathname.replace(languagePathRegex, "/app");
  return pathnameWithoutLanguage === href;
};

const AgencySettingsMenu = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  return (
    <div className="bg-slate-50">
      <div className="m-4">
        <h3>{t("agency-settings")}</h3>
      </div>
      <ul className="menu w-56 h-screen">
        {navigations.map(nav => {
          return (
            <li key={nav.labelKey}>
              <Link
                href={nav.href}
                className={checkPathname(pathname, nav.href) ? "active" : ""}
              >
                {t(nav.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AgencySettingsMenu;
