import {
  InboxIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Verified Contact Database",
    description:
      "Access an extensive database filled with verified contacts essential for global expansion. Our meticulously curated lists ensure you connect with the right people, right away.",
    icon: GlobeAltIcon,
  },
  {
    name: "AI-Powered Key Person Identification",
    description:
      "Let AI revolutionize your growth strategy by identifying key individuals tailored to your business needs. Our intelligent algorithms analyze your requirements to pinpoint the contacts most likely to drive your success.",
    icon: CheckCircleIcon,
  },
  {
    name: "Cost-Effective Pricing",
    description:
      "Embark on your global journey without financial strain with our straightforward pricing model. At just $299 per month, unlock individual contact information for as little as $3, making expansive networking more accessible than ever.",
    icon: InboxIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Begin your global success story today.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With AI-driven insights, unlock the key contacts you need for
            expansion. Simplify your journey to international growth with
            targeted strategies that match your business goals.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map(feature => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
