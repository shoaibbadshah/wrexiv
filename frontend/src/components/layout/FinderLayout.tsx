import React from "react";
import { ReactNode } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const FinderLayout = ({ children }: Props) => {
  return (
    <div>
      <header className="">
        <nav
          className="flex items-center justify-between px-6 py-4"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center space-x-4">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <Image src="/logo.png" alt="logo" height="50" width="170" />
            </Link>
            <h3 className="text-xl font-bold">Finder</h3>
          </div>
          <div className="hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-1 justify-end">Switch Country</div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default FinderLayout;
