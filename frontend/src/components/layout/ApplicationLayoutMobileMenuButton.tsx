"use client";

import { Fragment, ReactNode, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setOpen } from "@/store/mobileMenuSlice";

export default function ApplicationLayoutMobileMenuButton() {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 hidden lg:hidden"
      onClick={() => dispatch(setOpen(true))}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
