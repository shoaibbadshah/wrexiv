import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface Frequency {
  value: string;
  label: string;
}

const frequencies: Frequency[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
];

interface Price {
  monthly: string;
  annually: string;
}

interface Tier {
  name: string;
  id: string;
  href: string;
  featured: boolean;
  description: string;
  price: Price;
  mainFeatures: string[];
}

const tiers: Tier[] = [
  {
    id: "deel",
    name: "GlobalDeel",
    href: "#",
    featured: true,
    description: "The best financial services for your thriving business.",
    price: { monthly: "$60", annually: "$576" },
    mainFeatures: [
      "Advanced invoicing",
      "Easy to use accounting",
      "Mutli-accounts",
      "Tax planning toolkit",
      "VAT & VATMOSS filing",
      "Free bank transfers",
    ],
  },
  {
    id: "consulting",
    name: "Specialized Consulting Firm",
    href: "#",
    featured: false,
    description: "All your essential business finances, taken care of.",
    price: { monthly: "$15", annually: "$144" },
    mainFeatures: [
      "Basic invoicing",
      "Easy to use accounting",
      "Mutli-accounts",
    ],
  },
  {
    id: "government",
    name: "Government Agency Support",
    href: "#",
    featured: false,
    description: "Convenient features to take your business to the next level.",
    price: { monthly: "$30", annually: "$288" },
    mainFeatures: [
      "Basic invoicing",
      "Easy to use accounting",
      "Mutli-accounts",
      "Tax planning toolkit",
    ],
  },
];

interface TierAvailability {
  [tierName: string]: boolean | string;
}

interface Feature {
  name: string;
  tiers: TierAvailability;
}

interface Section {
  name: string;
  features: Feature[];
}

const sections: Section[] = [
  {
    name: "Features and Services",
    features: [
      {
        name: "AI SaaS Tools",
        tiers: { deel: true, consulting: false, government: false },
      },
      {
        name: "Online Community",
        tiers: { deel: true, consulting: false, government: false },
      },
      {
        name: "Accelerator Program",
        tiers: {
          deel: true,
          consulting: false,
          government: true,
        },
      },
      {
        name: "Regular Mentoring",
        tiers: {
          deel: true,
          consulting: true,
          government: false,
        },
      },
      {
        name: "On-site accompaniment support",
        tiers: { deel: true, consulting: true, government: false },
      },
      {
        name: "Design and Engineering",
        tiers: { deel: true, consulting: false, government: false },
      },
    ],
  },
  {
    name: "Price Comparison",
    features: [
      {
        name: "Consulting by experts",
        tiers: {
          deel: "Included in the $399/month",
          consulting: "$10,000 - 100,000",
          government: "-",
        },
      },
      {
        name: "Appointment Acquisition",
        tiers: {
          deel: "Included in the $399/month",
          consulting: "$500-/appointment",
          government: "-",
        },
      },
      {
        name: "Research Services",
        tiers: {
          deel: "Included in the $399/month",
          consulting: "$5,000 - 10,000",
          government: "-",
        },
      },
      {
        name: "Design and Engineering",
        tiers: {
          deel: "Included in the $399/month",
          consulting: "$10,000 - 100,000",
          government: "-",
        },
      },
      {
        name: "Accompaniment on meetings",
        tiers: {
          deel: "Included in the $399/month",
          consulting: "$500-/meeting",
          government: "-",
        },
      },
      {
        name: "On-site accompaniment support",
        tiers: {
          deel: "Included in the $399/month",
          consulting: "$1,000 - 10,000",
          government: "-",
        },
      },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CompetitorsSection() {
  const frequency = frequencies[0];

  return (
    <div className="relative bg-gray-50 pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How We Are Different
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 hidden">
          The support you need for entering the Japanese market is all in one
          package. Expand your market with the power of experts and technology.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Feature comparison (up to lg) */}
        <section
          aria-labelledby="mobile-comparison-heading"
          className="lg:hidden"
        >
          <h2 id="mobile-comparison-heading" className="sr-only">
            Feature comparison
          </h2>

          <div className="mx-auto max-w-2xl space-y-16">
            {tiers.map(tier => (
              <div key={tier.id} className="border-t border-gray-900/10">
                <div
                  className={classNames(
                    tier.featured ? "border-indigo-600" : "border-transparent",
                    "-mt-px w-72 border-t-2 pt-10 md:w-80"
                  )}
                >
                  <h3
                    className={classNames(
                      tier.featured ? "text-indigo-600" : "text-gray-900",
                      "text-sm font-semibold leading-6"
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-10 space-y-10">
                  {sections.map(section => (
                    <div key={section.name}>
                      <h4 className="text-sm font-semibold leading-6 text-gray-900">
                        {section.name}
                      </h4>
                      <div className="relative mt-6">
                        {/* Fake card background */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block"
                        />

                        <div
                          className={classNames(
                            tier.featured
                              ? "ring-2 ring-indigo-600"
                              : "ring-1 ring-gray-900/10",
                            "relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0"
                          )}
                        >
                          <dl className="divide-y divide-gray-200 text-sm leading-6">
                            {section.features.map(feature => (
                              <div
                                key={feature.name}
                                className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                              >
                                <dt className="pr-4 text-gray-600">
                                  {feature.name}
                                </dt>
                                <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                  {typeof feature.tiers[tier.name] ===
                                  "string" ? (
                                    <span
                                      className={
                                        tier.featured
                                          ? "font-semibold text-indigo-600"
                                          : "text-gray-900"
                                      }
                                    >
                                      {feature.tiers[tier.name]}
                                    </span>
                                  ) : (
                                    <>
                                      {feature.tiers[tier.name] === true ? (
                                        <CheckIcon
                                          className="mx-auto h-5 w-5 text-indigo-600"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <XMarkIcon
                                          className="mx-auto h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      )}

                                      <span className="sr-only">
                                        {feature.tiers[tier.name] === true
                                          ? "Yes"
                                          : "No"}
                                      </span>
                                    </>
                                  )}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>

                        {/* Fake card border */}
                        <div
                          aria-hidden="true"
                          className={classNames(
                            tier.featured
                              ? "ring-2 ring-indigo-600"
                              : "ring-1 ring-gray-900/10",
                            "pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block"
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature comparison (lg+) */}
        <section
          aria-labelledby="comparison-heading"
          className="hidden lg:block"
        >
          <h2 id="comparison-heading" className="sr-only">
            Feature comparison
          </h2>

          <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block">
            {tiers.map(tier => (
              <div key={tier.id} aria-hidden="true" className="-mt-px">
                <div
                  className={classNames(
                    tier.featured ? "border-indigo-600" : "border-transparent",
                    "border-t-2 pt-10"
                  )}
                >
                  <p
                    className={classNames(
                      tier.featured ? "text-indigo-600" : "text-gray-900",
                      "text-sm font-semibold leading-6"
                    )}
                  >
                    {tier.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="-mt-6 space-y-16">
            {sections.map(section => (
              <div key={section.name}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {section.name}
                </h3>
                <div className="relative -mx-8 mt-10">
                  {/* Fake card backgrounds */}
                  <div
                    className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                    aria-hidden="true"
                  >
                    <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                    <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                    <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                  </div>

                  <table className="relative w-full border-separate border-spacing-x-8">
                    <thead>
                      <tr className="text-left">
                        <th scope="col">
                          <span className="sr-only">Feature</span>
                        </th>
                        {tiers.map(tier => (
                          <th key={tier.id} scope="col">
                            <span className="sr-only">{tier.name} tier</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.features.map((feature, featureIdx) => (
                        <tr key={feature.name}>
                          <th
                            scope="row"
                            className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                          >
                            {feature.name}
                            {featureIdx !== section.features.length - 1 ? (
                              <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                            ) : null}
                          </th>
                          {tiers.map(tier => (
                            <td
                              key={tier.id}
                              className="relative w-1/4 px-4 py-0 text-center"
                            >
                              {section.name === "Price Comparison" && (
                                <span
                                  className={classNames(
                                    tier.id === "deel"
                                      ? "font-semibold text-indigo-600"
                                      : "text-gray-500",
                                    "text-sm leading-6"
                                  )}
                                >
                                  {feature.tiers[tier.id]}
                                </span>
                              )}
                              {section.name === "Features and Services" && (
                                <span className="relative h-full w-full py-3">
                                  {typeof feature.tiers[tier.name] ===
                                  "string" ? (
                                    <span
                                      className={classNames(
                                        tier.featured
                                          ? "font-semibold text-indigo-600"
                                          : "text-gray-900",
                                        "text-sm leading-6"
                                      )}
                                    >
                                      {feature.tiers[tier.name]}
                                    </span>
                                  ) : (
                                    <>
                                      {feature.tiers[tier.id] === true ? (
                                        <CheckIcon
                                          className="mx-auto h-5 w-5 text-indigo-600"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <XMarkIcon
                                          className="mx-auto h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      )}

                                      <span className="sr-only">
                                        {feature.tiers[tier.name] === true
                                          ? "Yes"
                                          : "No"}
                                      </span>
                                    </>
                                  )}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Fake card borders */}
                  <div
                    className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                    aria-hidden="true"
                  >
                    {tiers.map(tier => (
                      <div
                        key={tier.id}
                        className={classNames(
                          tier.featured
                            ? "ring-2 ring-indigo-600"
                            : "ring-1 ring-gray-900/10",
                          "rounded-lg"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
