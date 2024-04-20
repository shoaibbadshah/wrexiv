"use client";

import React from "react";
import { ReactNode } from "react";
import Header from "../organisms/Header";

type Props = {
  children: ReactNode;
};

const LandingPageLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LandingPageLayout;
