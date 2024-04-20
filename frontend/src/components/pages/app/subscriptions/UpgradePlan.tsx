"use client";

import usePayment from "@/hooks/usePayment";
import classNames from "@/utilities/classNames";
import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "24/7 customer support",
    tiers: { Starter: true, Scale: true, Growth: true },
  },
  {
    name: "Instant notifications",
    tiers: { Starter: true, Scale: true, Growth: true },
  },
  {
    name: "Budgeting tools",
    tiers: { Starter: true, Scale: true, Growth: true },
  },
];

export default function UpgradePlan() {
  const { handlePayment } = usePayment();
  return (
    <div className="rounded-lg shadow-sm ring-1 ring-gray-900/5 h-full">
      <div className="p-6">
        <h2 className="text-gray-900 text-sm font-semibold leading-6">
          Basic Plan
        </h2>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
          <div className="mt-2 flex items-center gap-x-4">
            <p className="text-gray-900 text-4xl font-bold tracking-tight">
              299
            </p>
            <div className="text-sm leading-5">
              <p className={"text-gray-900"}>USD</p>
              <p className={"text-gray-500"}>{`Billed Monthly`}</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={handlePayment}>
            Buy this plan
          </button>
        </div>
        <div className="mt-8 flow-root sm:mt-10">
          <ul
            role="list"
            className={classNames(
              "divide-gray-900/5 border-gray-900/5 text-gray-600",
              "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0"
            )}
          >
            {features.map(mainFeature => (
              <li key={mainFeature.name} className="flex gap-x-3 py-2">
                <CheckIcon
                  className="text-indigo-600 h-6 w-5 flex-none"
                  aria-hidden="true"
                />
                {mainFeature.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
