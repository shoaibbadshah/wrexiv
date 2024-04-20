import React from "react";
import { ReactNode } from "react";
import PortfolioHeader from "../organisms/PortfolioHeader";

type Props = {
  children: ReactNode;
};

// comment
const PortfolioLayout = ({ children }: Props) => {
  return (
    <div>
      <PortfolioHeader />
      {children}
    </div>
  );
};

export default PortfolioLayout;
