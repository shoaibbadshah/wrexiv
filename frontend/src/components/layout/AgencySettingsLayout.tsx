"use client";

import AgencySettingsMenu from "../organisms/AgencySettingsMenu";

type PropsType = {
  children: React.ReactNode;
};

const AgencySettingsLayout = ({ children }: PropsType) => {
  return (
    <div className="flex">
      <AgencySettingsMenu />
      <div>{children}</div>
    </div>
  );
};

export default AgencySettingsLayout;
