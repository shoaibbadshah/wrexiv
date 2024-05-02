import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18nConfig } from "@/../i18n-config";

export function middleware(request: NextRequest) {
  let response;
  let nextLocale;

  const { locales, defaultLocale } = i18nConfig;

  const pathname = request.nextUrl.pathname;

  const languagePathRegex = new RegExp(
    `/app/(${i18nConfig.locales.join("|")})`
  );
  const pathnameWithoutLanguage = pathname.replace(languagePathRegex, "/app");
  const isFirstVisit = !request.cookies.has("LANGUAGE");

  // Redirect to the url with the language prefix if the language is not set in the url
  // If it is the first visit, let the layout handle the redirection and setting the cookie
  if (pathname == pathnameWithoutLanguage && !isFirstVisit) {
    const currentLocale = request.cookies.get("LANGUAGE")?.value;

    const isLocaleValid = (locale: string | undefined) => {
      return locale && locales.includes(locale);
    };

    const locale = isLocaleValid(currentLocale) ? currentLocale : defaultLocale;
    const currentAppPath = pathname.split("/app")[1];
    let newPath = `/app/${locale}${currentAppPath}`;
    if (request.nextUrl.search) newPath += request.nextUrl.search;

    response = NextResponse.redirect(new URL(newPath, request.url));
    nextLocale = locale;
  }

  if (!response) response = NextResponse.next();

  if (nextLocale)
    response.cookies.set("LANGUAGE", nextLocale, {
      path: "/app",
      maxAge: 60 * 60 * 24 * 30,
    });

  return response;
}

// Only apply this middleware to paths that start with /app
export const config = {
  matcher: "/(app.*)",
};
