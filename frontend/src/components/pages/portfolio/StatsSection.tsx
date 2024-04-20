const stats = [
  { id: 1, name: "Next-Day Appointments", value: "24h" },
  { id: 2, name: "Affordable Research", value: "$299/m" },
  { id: 3, name: "Unlimited Connections", value: "∞" },
  { id: 4, name: "Global Reach", value: "196" },
];

export default function StatsSection() {
  return (
    <div className="bg-white py-8 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Revolutionizing Your Global Strategy
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {
                "Discover unparalleled efficiency and connectivity with our platform. From next-day appointments to reaching every corner of the globe, we're redefining how businesses expand internationally."
              }
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
