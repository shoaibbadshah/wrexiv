import { JAPAN_COMMUNITY_SUBMIT_FORM_URL } from "@/constants/urls";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const targetFeatures = [
  "Already has a product or service with sales.",
  "Considering into Japan or Asia.",
  "The product or service includes software",
  "Needs diverse support, including business tasks and networking",
  "Lacks a representative for Japanese expansion",
  "Not familiar with Japanese business",
];

const nonTargetFeatures = [
  "At idea stage, no product/service",
  "Aims for Western/African markets, not Japan/Asia",
  "Only requires advice, no practical support",
  "Knowledgeable in Japanese business, experienced",
  "Not considering immediate entry",
  "Unable to commit long-term",
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TargetSection() {
  return (
    <div className="relative isolate bg-white px-6 lg:px-8">
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
          Eligibility for Participation
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Who Should Join Our Platform?
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Our platform is tailored for specific purposes and may not be suitable
        for everyone. Please check if it is the right fit for you.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        <div className="relative bg-white shadow-2xl rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 space-y-6">
          <h3 className="text-base font-semibold leading-7 text-indigo-600">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Ideal for our community</span>
            </div>
          </h3>
          <p className="flex items-baseline gap-x-2">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              You SHOULD Apply if...
            </span>
            <span className="text-base text-gray-500 hidden">/month</span>
          </p>
          <p className="text-base leading-7 text-gray-600 hidden"></p>
          <ul role="list" className="space-y-3 text-sm leading-6 text-gray-600">
            {targetFeatures.map(feature => (
              <li key={feature} className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
          <a
            className={classNames(
              "bg-indigo-600 text-white shadow hover:bg-indigo-500",
              "mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
            )}
            href={JAPAN_COMMUNITY_SUBMIT_FORM_URL}
            target="_blank"
          >
            Get started today
          </a>
        </div>
        <div className="bg-white/60 sm:mx-8 lg:mx-0 sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 space-y-6">
          <h3 className="text-base font-semibold leading-7 text-indigo-600">
            <div className="flex text-gray-500 items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Not a fit for our community.</span>
            </div>
          </h3>
          <p className="flex items-baseline gap-x-2">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              You SHOULD NOT Apply if...
            </span>
            <span className="text-base text-gray-500 hidden">/month</span>
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600 hidden">
            hogehoge
          </p>
          <ul role="list" className="space-y-3 text-sm leading-6 text-gray-600">
            {nonTargetFeatures.map(feature => (
              <li key={feature} className="flex gap-x-3">
                <ExclamationCircleIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Please consult us first for non-software items like food or hardware, as
        we may be able to accommodate.
      </p>
    </div>
  );
}
