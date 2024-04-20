import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Mentor Matching",
    description:
      "We will invite you to a private room via Discord or other tools to meet your mentor. Unlimited chat consultations are available.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Kick-off MTG",
    description:
      "We will hold an online meeting to discuss with the mentor about the purpose of the expansion and its use.",
    icon: LockClosedIcon,
  },
  {
    name: "Contract and Settlement",
    description:
      "After the trial period, you will be notified of settlement and receive ongoing support for your overseas expansion.",
    icon: ServerIcon,
  },
];

export default function ProductSection() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Onboarding
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How to proceed during the first week
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                You can start your free, unlimited chat consultation with a
                mentor immediately after your trial starts, try it out for a
                week and experience the awesomeness of GlobalDeel.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map(feature => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
