import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";

import { CaseStudy } from "@/contentful/caseStudy";

type PropsType = {
  caseStudies: CaseStudy[];
};

export default async function CaseStudies({ caseStudies }: PropsType) {
  return (
    <div className="m-4 px-4 py-36 max-w-[1200px] mx-auto space-y-10">
      <div className="my-2">
        <Suspense fallback={<div>Loading...</div>}>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {caseStudies.map(caseStudy => (
              <li
                key={caseStudy.slug}
                className="col-span-1 divide-y divide-gray-200 rounded-lg"
              >
                <article
                  key={caseStudy.slug}
                  className="flex flex-col items-start justify-between"
                >
                  <Link href={`/case-studies/${caseStudy.slug}`}>
                    <div className="relative w-full">
                      <Image
                        src={`https:${caseStudy.image?.src}`}
                        alt=""
                        className="aspect-[3/4] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/4] lg:aspect-[3/4]"
                        width={640}
                        height={426}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </Link>
                  <div className="mt-4 space-x-1 text-gray-500 flex justify-end">
                    <div>{caseStudy.topic}</div>
                  </div>
                  <div className="max-w-xl space-y-3 mt-2">
                    <div className="group relative">
                      <h3 className="text-lg font-semibold leading-6 group-hover:text-gray-500">
                        <Link href={`/case-studies/${caseStudy.slug}`}>
                          <span className="absolute inset-0" />
                          {caseStudy.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
    </div>
  );
}
