"use client";

import TenantNewForm from "@/components/forms/TenantNewForm";
import { FIRST_APP_PAGE } from "@/constants/urls";
import { useRouter } from "next/navigation";

const TenantsNew = () => {
  const router = useRouter();
  return (
    <div className="min-w-[500px] max-w-md mx-auto my-8 space-y-4">
      <h2 className="text-xl">Tenant Settings</h2>
      <div>
        <TenantNewForm
          handleAfterSave={() => {
            router.replace("/app/leads");
          }}
        />
      </div>
    </div>
  );
};

export default TenantsNew;
