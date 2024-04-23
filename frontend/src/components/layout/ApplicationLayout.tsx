"use client";

import { ReactNode } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ApplicationLayoutUserMenu from "./ApplicationLayoutUserMenu";
import ApplicationLayoutMobileMenu from "./ApplicationLayoutMobileMenu";
import ApplicationLayoutMobileMenuButton from "./ApplicationLayoutMobileMenuButton";
import Link from "next/link";
import { navigation } from "./navigation";
import { usePathname, useRouter } from "next/navigation";
import useCurrentTenantUser from "@/hooks/useCurrentTenant";
import { FIRST_APP_PAGE } from "@/constants/urls";
// import { useTalentProfilesQuery } from "@/graphql/generated";

type Props = {
  children: ReactNode;
};

const INITIALIZE_PAGE = "/app/tenant/new";

export default function ApplicationLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  // const { data, loading } = useTalentProfilesQuery({
  //   fetchPolicy: "network-only",
  // });

  /* if (!loading && !isInitialized && pathname !== INITIALIZE_PAGE) {
    router.replace(INITIALIZE_PAGE);
  }

  if (isInitialized && pathname === INITIALIZE_PAGE) {
    router.replace(FIRST_APP_PAGE);
  } */

  return (
    <div className="flex h-[100vh] max-h-[100vh] overflow-hidden">
      <ApplicationLayoutMobileMenu />
      <div className="flex flex-col h-full w-full">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6">
          <ApplicationLayoutMobileMenuButton />
          {/* <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" /> */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-8">
            <div className="flex items-center">
              <Link href="/app">
                <h3 className="text-xl font-bold text-gray-900">
                  GlobalTalentDB
                </h3>
                {/* <Image
                  src="/logo.png"
                  alt="Logo"
                  width={140}
                  height={40}
                  className="max-h-10 lg:max-h-none"
                  style={{ objectFit: "contain" }}
                /> */}
              </Link>
            </div>
            <div className="hidden sm:flex items-center space-x-2 grow ">
              {navigation.map(item => (
                <Link
                  href={item.href}
                  className={`${item.hide ? "hidden" : ""}`}
                  key={item.name}
                >
                  <button className="btn btn-ghost btn-sm">{item.name}</button>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {false && <div>Countries Select</div>}
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                aria-hidden="true"
              />
              <ApplicationLayoutUserMenu />
            </div>
          </div>
        </div>

        <div className="overflow-hidden grow flex flex-col">{children}</div>
      </div>
    </div>
  );
}
