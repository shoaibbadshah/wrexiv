"use client";

import UserSettingsMenu from "@/components/organisms/UserSettingsMenu";
import useAuthUser from "@/hooks/useAuthUser";
import useCurrentTenantUser from "@/hooks/useCurrentTenant";
import useUser from "@/hooks/useUser";

const UserShow = () => {
  const { user } = useAuthUser();
  const { tenantUser } = useCurrentTenantUser();
  return (
    <div className="flex">
      <UserSettingsMenu />
      <div className="m-8">
        <h1>User Profile</h1>
        <div>
          <p>Email</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserShow;
