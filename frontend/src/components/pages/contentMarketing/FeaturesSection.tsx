import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Unlimited strategic consulting",
    description:
      "Advanced AI tools via a user-friendly SaaS platform, specialized for international expansion.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Software development / localization",
    description:
      "Personalized guidance from local experts to optimize your business strategies and efficiency.",
    icon: LockClosedIcon,
  },
  {
    name: "Appointment acquisition",
    description:
      "Fast-track growth with our quarterly Japan-focused accelerator program, providing mentorship and key industry connections.",
    icon: ArrowPathIcon,
  },
  {
    name: "Meeting facilitation",
    description:
      "Efficient appointment acquisition on your behalf, providing connections that lead to exponential growth.",
    icon: FingerPrintIcon,
  },
  {
    name: "Interpretation and translation",
    description:
      "Professional language services by native speakers for clear communication in international business.",
    icon: ArrowPathIcon,
  },
  {
    name: "Market research",
    description:
      "Accurate and up-to-date in-depth market research for informed decision-making in the Japanese market.",
    icon: FingerPrintIcon,
  },
  {
    name: "CXO recruitment support",
    description:
      "Strategic advice and mentorship for successful navigation in the Japanese market.",
    icon: ArrowPathIcon,
  },
  {
    name: "Corporate,bank accounts opening",
    description:
      "Join a network of experts and businesses aiming for international expansion, fostering collaboration and growth in Japan.",
    icon: FingerPrintIcon,
  },
  {
    name: "Fundraising support",
    description:
      "High-quality, innovative design and engineering solutions tailored to your needs.",
    icon: FingerPrintIcon,
  },
];

export default function FeaturesSection() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
          Features
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to expand your business expansion
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          We provide a package of necessities for expanding your business.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
          {features.map(feature => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 hidden">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
