"use client";

import { useRouter } from "next/navigation";

const UserSettingsMenu = () => {
  const router = useRouter();
  return (
    <div className="bg-slate-100">
      <div className="m-4">
        <h3>User Settings</h3>
      </div>
      <ul className="menu bg-slate-100 w-56 h-screen">
        <li>
          <a className="active">Profile</a>
        </li>
      </ul>
    </div>
  );
};

export default UserSettingsMenu;
