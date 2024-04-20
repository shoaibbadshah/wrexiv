"use client";

import TenantSettingsLayout from "@/components/layout/TenantSettingsLayout";
import CurrentPlan from "./CurrentPlan";
import Transactions from "./Transactions";
import UpgradePlan from "./UpgradePlan";

const Subscriptions = () => {
  return (
    <TenantSettingsLayout>
      <div className="space-y-8">
        <div className="p-8 grid grid-cols-2 gap-x-12">
          <div className="space-y-4 flex flex-col">
            <h2 className="text-lg">Current Plan</h2>
            <CurrentPlan />
          </div>
          <div className="space-y-4 flex flex-col">
            <h2 className="text-lg">Upgrade Plan</h2>
            <UpgradePlan />
          </div>
        </div>
        <div className="">
          <Transactions />
        </div>
      </div>
    </TenantSettingsLayout>
  );
};

export default Subscriptions;
