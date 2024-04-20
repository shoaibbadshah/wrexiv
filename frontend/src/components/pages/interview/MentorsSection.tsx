import Image from "next/image";

const people = [
  {
    name: "Designer & Angel Investor",
    role: "Koki Takahashi",
    imageUrl: "/capitalists/takahashi.jpg",
    bio: "In 2018, he co-founded AVILEN, an AI and DX support startup in Japan, and the company was listed on the TSE Growth after 5 years in business.He has been the Chief Design Officer and Head of the new business team at the company and has been driving the business forward.",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Engineer & Business Development",
    role: "Kevin Abel",
    imageUrl: "/capitalists/kevin.jpg",
    bio: "Experienced in business startups as an engineer, product owner, and PdM, with involvement in more than 10 SaaS businesses. Currently, as the representative of Wrexiv.inc, there is a focus on supporting Asian companies in their overseas expansion.",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
];

export default function MentorsSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mentors & Managers
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            In the Japanese startup market, many mentors with extensive
            knowledge, experience, and networks will fully support your entry
            into Japan. All support is available in either English or Japanese.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
        >
          {people.map(person => (
            <li key={person.name}>
              <Image
                className="aspect-[3/2] w-full rounded-2xl object-cover"
                src={person.imageUrl}
                alt="person"
                width={300}
                height={80}
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                {person.name}
              </h3>
              <p className="text-base leading-7 text-gray-600">{person.role}</p>
              <p className="mt-4 text-base leading-7 text-gray-600">
                {person.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
