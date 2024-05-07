import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import languages from "@/lib/translations/languages";

import { i18nConfig } from "@/../i18n-config";

export function middleware(request: NextRequest) {
  let response;
  const { locales, defaultLocale } = i18nConfig;
  const pathname = request.nextUrl.pathname;

  const currentLanguage = pathname
    .match(new RegExp(`^/(${Object.keys(languages).join("|")})($|/)`))?.[0]
    .replaceAll("/", "");

  const pathnameWithoutLanguage = pathname.replace(
    new RegExp(`^/${currentLanguage}`),
    ""
  );

  // If the current language is undefined, redirect to the default locale
  if (currentLanguage === undefined) {
    let newPath = `/${defaultLocale}${pathnameWithoutLanguage}`;
    if (request.nextUrl.search) newPath += request.nextUrl.search;
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathnameWithoutLanguage}`, request.url)
    );
  }
  // If the current language is the default locale or not included in the locales, redirect to the default locale
  else if (
    currentLanguage === defaultLocale ||
    !locales.includes(currentLanguage)
  ) {
    let newPath = pathnameWithoutLanguage;
    if (request.nextUrl.search) newPath += request.nextUrl.search;
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  // If the current language is included in the locales, return NextResponse.next()
  return NextResponse.next();

  const isFirstVisit = !request.cookies.has("LANGUAGE");

  if (!isFirstVisit) {
    const currentLocale = request.cookies.get("LANGUAGE")?.value;
    const isLocaleValid = (locale: string | undefined) => {
      return locale && locales.includes(locale);
    };

    const locale = isLocaleValid(currentLocale) ? currentLocale : defaultLocale;

    let newPath = `/${locale}${pathnameWithoutLanguage}`;
    if (request.nextUrl.search) newPath += request.nextUrl.search;

    response = NextResponse.redirect(new URL(newPath, request.url));
    nextLocale = locale;
  }

  if (isPathWithLanguage) {
    const currentLocale = request.cookies.get("LANGUAGE")?.value;

    const isLocaleValid = (locale: string | undefined) => {
      return locale && locales.includes(locale);
    };
    const locale = isLocaleValid(currentLocale) ? currentLocale : defaultLocale;

    const currentAppPath = pathname.split(`/${locale}`)[1];
    let newPath = `/${locale}${currentAppPath}`;
    if (request.nextUrl.search) newPath += request.nextUrl.search;

    response = NextResponse.redirect(new URL(newPath, request.url));
    nextLocale = locale;
  }

  if (!response) response = NextResponse.next();

  return response;
}

export const config = {
  matcher:
    "/((?!api/|_next/static|_next/image|favicon.ico).*(?!png|svg|jpg|jpeg)$)",
};
