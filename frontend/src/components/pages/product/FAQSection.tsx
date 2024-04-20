const faqs = [
  {
    id: 1,
    question:
      "What services does your platform offer for expanding into the Japanese market?",
    answer:
      "We commit to results through various means, including expert advisory services, practical support, hosting acceleration programs, and offering AI SaaS Tools.",
  },
  {
    id: 2,
    question: "Who is eligible to use your services?",
    answer:
      "Our services are best suited for businesses with existing products or services, looking to expand into Japan or Asia.",
  },
  {
    id: 3,
    question: "What is the pricing structure for your services?",
    answer:
      "We offer a single plan at $399/month and will provide full support to the best of our capacity. This includes access to our comprehensive package of services for entering the Japanese market, with no hidden fees. The first week is offered as a free trial.",
  },
  {
    id: 4,
    question:
      "How does your service compare to other consulting firms and government agency support?",
    answer:
      "Unlike other services, we provide a more integrated and comprehensive package at a competitive price. This includes AI SaaS tools, regular mentoring, on-site accompaniment support, and design and engineering expertise, which are often not available with specialized consulting firms or government agency support tiers.",
  },
  {
    id: 0,
    question:
      "Is the target country for expansion only Japan? Can I receive support if I want to expand to countries other than Japan?",
    answer:
      "Our services are primarily centered on Japan. However, we also offer support for those who wish to expand their services throughout Asia.",
  },
  {
    id: 5,
    question:
      "Can non-software products like food or hardware be accommodated?",
    answer:
      "Please consult with us first regarding non-software items. Depending on the specifics, we may be able to accommodate and provide support for these types of products.",
  },
  {
    id: 5,
    question: "What qualifications do your mentors and experts have?",
    answer:
      "Our mentors and experts come from diverse backgrounds, including successful entrepreneurs, experienced business developers, and tech innovators, all with extensive knowledge and networks in the Japanese startup market.",
  },
];

export default function FAQSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl divide-y divide-gray-900/10 px-6 lg:px-8">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
          {faqs.map(faq => (
            <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
