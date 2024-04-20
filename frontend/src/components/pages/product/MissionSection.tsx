const stats = [
  { label: "The revenue we generated in Japan", value: "3 billion yen" },
  { label: "Customers we have dealt with in Japan", value: "2,666" },
  { label: "Mentors and Experts", value: "120" },
];

export default function MissionSection() {
  return (
    <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our mission
        </h2>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
            <p className="text-xl leading-8 text-gray-600">
              {
                "Our mission is to make Japan an even more remarkable country by bringing the world's finest technologies and products to Japan. We provide deep insights into the Japanese business market to people around the globe."
              }
            </p>
            <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
              <p>
                What sets us apart from other consulting services is our focus
                on various professional services and support specifically for
                learning and developing AI SaaS Tools. As a result, we are able
                to offer a range of services at prices that are exceptionally
                competitive in the industry.
              </p>
              <p className="mt-10">
                Our commitment is to wholeheartedly support clients aiming to
                enter the Japanese market. We learn from our clients, and
                through this experience, we strive to encapsulate that knowledge
                into reproducible and effective products.
              </p>
            </div>
          </div>
          <div className="lg:flex lg:flex-auto lg:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
              {stats.map(stat => (
                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">
                    {stat.label}
                  </dt>
                  <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
