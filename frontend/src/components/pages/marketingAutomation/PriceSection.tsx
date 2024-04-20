import { JAPAN_COMMUNITY_SUBMIT_FORM_URL } from "@/constants/urls";
import { CheckIcon } from "@heroicons/react/20/solid";

const includedFeatures = [
  "Access to all AI SaaS tools",
  "Weekly mentoring sessions",
  "Engineering and design support",
  "Accelerator program",
  "Accompaniment on business meetings",
  "Community membership",
  "Assistance with product localization",
  "Accompaniment and support for inspections.",
  // "Research services",
  // "Support by experts through chat and interviews",
  // "Appointment acquisition assistance (as much as possible)",
  // "Sharing of the latest information, expert comments",
];

export default function PriceSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple no-tricks pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The support you need for entering the Japanese market is all in one
            package. Expand your market with the power of experts and
            technology.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Community Membership
            </h3>
            <p className="text-base leading-7 text-gray-600">
              The support you need for entering the Japanese market is all in
              one package. Expand your market with the power of experts and
              technology.
            </p>
            <div className="flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-2"
            >
              {includedFeatures.map(feature => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md h-full">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  First week free trial
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $399/month
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 hidden">
                    USD
                  </span>
                </p>
                <a
                  href={JAPAN_COMMUNITY_SUBMIT_FORM_URL}
                  target="_blank"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Try For Free
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
