"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigations = [
  {
    label: "Account",
    href: "/app/tenant",
  },
  {
    label: "Subscriptions",
    href: "/app/tenant/subscriptions",
  },
];

const TenantSettingsMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="bg-slate-50">
      <div className="m-4">
        <h3>Tenant Settings</h3>
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

export default TenantSettingsMenu;
