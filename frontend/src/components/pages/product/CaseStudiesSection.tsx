import Image from "next/image";

const CASE_STUDIES = [
  {
    key: "first",
    header: "Expanding a SalesTech SaaS from the US to Japan",
    challenges: [
      "A US-based SalesTech SaaS company faced significant localization challenges while expanding into Japan, primarily due to unique Japanese software integration needs and distinct business customs.",
      "These complexities were initially underestimated by the company.",
    ],
    solutions: [
      "The company collaborated with GlobalDeel to gain insights into the Japanese market, leading to the development of tailored features and integrations for their SaaS product.",
      "This included adapting to Japanese business software and customs, aligning their product more closely with local needs.",
    ],
    outcomes: [
      "This strategic approach, informed by expert advice, resulted in a successful entry into the Japanese market.",
      "Demonstrating the critical role of cultural adaptation and local expertise in global business expansion.",
    ],
    name: "Courtney Henry",
    title: "CEO of Tuple",
    logo: "https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg",
    avatar: "/noavatar.png",
  },
  {
    key: "second",
    header: "Adapting a Women's E-Commerce App for Japan",
    challenges: [
      "An e-commerce app designed for women, originally developed in a non-Japanese market, faced the challenge of understanding and catering to the preferences of Japanese women.",
      "The company initially struggled to grasp the unique tastes and expectations of this new demographic, which was critical for successful market entry and user engagement.",
    ],
    solutions: [
      "The company used GlobalDeel to conduct interviews with Japanese women, gaining insights into their tastes.",
      "GlobalDeel also assisted in redesigning the app's user interface to appeal specifically to Japanese users, focusing on local aesthetic and functional preferences.",
    ],
    outcomes: [
      "This approach led to a successful adaptation of the app for the Japanese market.",
      "Increasing engagement and satisfaction among Japanese female users, showcasing the importance of targeted customer feedback and localized design in international expansions.",
    ],
    name: "Floyd Miles",
    title: "Director of Product",
    logo: "https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg",
    avatar: "/avatar3.png",
  },
];

export default function CaseStudiesSection() {
  return (
    <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-56 lg:px-8 space-y-12">
      <div>
        <h2 className="text-4xl font-bold">Case Studies</h2>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        {CASE_STUDIES.map(study => {
          return (
            <div
              className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20"
              key={study.key}
            >
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  {study.header}
                </h3>
              </div>
              <div className="grid grid-cols-2">
                <figcaption className="flex items-center gap-x-6">
                  <div className="flex">
                    <Image
                      className="mt-6 rounded-2xl object-cover"
                      src={study.avatar}
                      alt=""
                      width={60}
                      height={60}
                    />
                    <div>
                      <div className="font-semibold">Judith Black</div>
                      <div className="mt-1 text-gray-400">CEO of Tuple</div>
                    </div>
                  </div>
                </figcaption>
                <Image
                  className="mt-6 rounded-2xl object-cover"
                  src={study.logo}
                  alt=""
                  width={300}
                  height={80}
                />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight text-gray-900">
                  Challenges
                </h4>
                <ul className="list-disc leading-8 text-gray-600">
                  {study.challenges.map(challenge => {
                    return <li key={challenge}>{challenge}</li>;
                  })}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight text-gray-900">
                  Solutions
                </h4>
                <ul className="list-disc leading-8 text-gray-600">
                  {study.solutions.map(solution => {
                    return <li key={solution}>{solution}</li>;
                  })}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight text-gray-900">
                  Outcome
                </h4>
                <ul className="list-disc leading-8 text-gray-600">
                  {study.outcomes.map(outcome => {
                    return <li key={outcome}>{outcome}</li>;
                  })}
                </ul>
              </div>
              {/* <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8">
                  <p>
                    “Amet amet eget scelerisque tellus sit neque faucibus non
                    eleifend. Integer eu praesent at a. Ornare arcu gravida
                    natoque erat et cursus tortor consequat at. Vulputate
                    gravida sociis enim nullam ultricies habitant malesuada
                    lorem ac. Tincidunt urna dui pellentesque sagittis.”
                  </p>
                </blockquote>
              </figure> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
