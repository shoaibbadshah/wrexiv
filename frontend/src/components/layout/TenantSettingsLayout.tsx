"use client";

import TenantSettingsMenu from "@/components/organisms/TenantSettingsMenu";

type PropsType = {
  children: React.ReactNode;
};

const TenantSettingsLayout = ({ children }: PropsType) => {
  return (
    <div className="flex">
      <TenantSettingsMenu />
      <div>{children}</div>
    </div>
  );
};

export default TenantSettingsLayout;
