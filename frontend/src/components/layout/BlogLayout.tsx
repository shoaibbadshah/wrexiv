"use client";

import React from "react";
import { ReactNode } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const BlogLayout = ({ children }: Props) => {
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center space-x-4">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <Image src="/logo.png" alt="logo" height="60" width="200" />
            </Link>
            <h3 className="text-2xl font-bold">Blog</h3>
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
          {/* <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div> */}
          <div className="flex flex-1 justify-end">
            <Link href="/">
              Top <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default BlogLayout;
