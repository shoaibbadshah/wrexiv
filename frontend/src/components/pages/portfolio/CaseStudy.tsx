import Image from "next/image";

const caseStudies = [
  {
    topic: "Global Expansion",
    title: "Support for the US market expansion",
    image: "/portfolio/sample1.jpg",
  },
  {
    topic: "Software Development",
    title: "Media production utilizing HeadlessCMS",
    image: "/portfolio/sample1.jpg",
  },
  {
    topic: "Design",
    title: "Brand design support from founding to IPO",
    image: "/portfolio/sample1.jpg",
  },
];

export default function CaseStudy() {
  return (
    <div id="caseStudy" className="bg-white py-16 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div>
            <h2 className="text-xl tracking-tight text-gray-500 sm:text-2xl">
              Case Studies
            </h2>
            <h2 className="mt-6 text-3xl tracking-tight text-gray-900 sm:text-4xl">
              We have driven growth for many great companies
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-10 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {caseStudies.map(cases => (
                <div key={cases.topic} className="flex flex-col">
                  <dt className="text-base leading-7 text-xl text-gray-500">
                    <Image
                      className="aspect-[2/2.1] w-full rounded-2xl object-cover mb-4"
                      src={cases.image}
                      alt="person"
                      width={300}
                      height={80}
                    />
                    {cases.topic}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-2xl leading-7 text-gray-600">
                    <p className="flex-auto">{cases.title}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl underline text-right">
              <a href="/casestudy">Check our all case studies →</a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
