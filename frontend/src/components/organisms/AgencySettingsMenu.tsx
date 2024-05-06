"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigations = [
  {
    label: "Agency",
    href: "/app/agency",
  },
  {
    label: "Agency User",
    href: "/app/agency_user",
  },
];

const AgencySettingsMenu = () => {
  const pathname = usePathname();
  return (
    <div className="bg-slate-50">
      <div className="m-4">
        <h3>Agency Settings</h3>
      </div>
      <ul className="menu w-56 h-screen">
        {navigations.map(nav => {
          return (
            <li key={nav.label}>
              <Link
                href={nav.href}
                className={pathname === nav.href ? "active" : ""}
              >
                {nav.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AgencySettingsMenu;
