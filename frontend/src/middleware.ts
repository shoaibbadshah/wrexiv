import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import languages from "@/lib/translations/languages";

import { i18nConfig } from "@/../i18n-config";

function hanldeRootPath(request: NextRequest) {
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
}

export function handleNonLangPath(request: NextRequest) {
  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.match(new RegExp(`^/(app|admin).*`))) {
    return handleNonLangPath(request);
  } else {
    console.log(request.nextUrl.pathname, "hanldeRootPath");
    return hanldeRootPath(request);
  }
}

export const config = {
  matcher:
    "/((?!api/|_next/static|_next/image|favicon.ico).*$(?<!.jpg)(?<!.png)(?<!.jpeg)(?<!.svg))",
};
