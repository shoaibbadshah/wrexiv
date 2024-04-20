const values = [
  {
    name: "Global Vision",
    description:
      "Committed to enhancing the global landscape, we strategize and support our clients' international growth, aiming for a positive world impact.",
  },
  {
    name: "Technology-Driven",
    description:
      "Our roots in tech innovation guide us. We leverage our technical expertise to generate significant outcomes, bridging design and engineering.",
  },
  {
    name: "Hybrid Approach",
    description:
      "Blending online and offline modalities, we offer comprehensive support. Our approach adapts to your needs, including on-site assistance in Japan.",
  },
  {
    name: "Commitment to Results",
    description:
      "Focusing on impactful outcomes, we transform successful strategies into scalable solutions, always aligning with our mission-driven approach.",
  },
  {
    name: "Long-Term Partnership",
    description:
      "We view international expansion as a journey, offering sustained support and guidance, tailored to the evolving needs of our clients.",
  },
  {
    name: "Value Speed",
    description:
      "Recognizing the fast-paced market dynamics, we provide timely support to our clients, ensuring they capitalize on emerging business opportunities.",
  },
];

export default function ValuesSection() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our values
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
          voluptatum cupiditate veritatis in accusamus quisquam.
        </p>
      </div>
      <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {values.map(value => (
          <div key={value.name}>
            <dt className="font-semibold text-gray-900">{value.name}</dt>
            <dd className="mt-1 text-gray-600">{value.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
