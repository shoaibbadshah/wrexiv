import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/../i18n-config";

export function middleware(request: NextRequest) {
  let response;
  let nextLocale;

  const { locales, defaultLocale } = i18n;

  const pathname = request.nextUrl.pathname;

  // Skip paths that don't start with /app
  if (!pathname.startsWith("/app")) return NextResponse.next();

  const languagePathRegex = new RegExp(`/app/(${i18n.locales.join("|")})`);
  const pathnameWithoutLanguage = pathname.replace(languagePathRegex, "/app");
  const isFirstVisit = !request.cookies.has("LANGUAGE");
  console.log("isFirstVisit", isFirstVisit);

  // Redirect to the url with the language prefix if the language is not set in the url
  // If it is the first visit, let the layout handle the redirection and setting the cookie
  if (pathname == pathnameWithoutLanguage && !isFirstVisit) {
    const currentLocale = request.cookies.get("LANGUAGE")?.value;
    console.log(
      "currentLocale",
      currentLocale,
      currentLocale && currentLocale in locales
    );

    const isLocaleValid = (locale: string | undefined) => {
      return locale && locales.includes(locale);
    };

    const locale = isLocaleValid(currentLocale) ? currentLocale : defaultLocale;
    const currentAppPath = pathname.split("/app")[1];
    let newPath = `/app/${locale}${currentAppPath}`;
    console.log("newPath", newPath);
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

export const config = {
  matcher:
    "/((?!api/|_next/static|_next/image|img/|favicon.ico|logo/|icons/|images/|auth/).*)",
};
