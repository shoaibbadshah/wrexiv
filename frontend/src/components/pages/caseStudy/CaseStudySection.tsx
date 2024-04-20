import Image from "next/image";
import { fetchBlogPosts } from "@/contentful/blogPost";
import { Suspense } from "react";
import formatDate from "@/utilities/formatDate";
import Link from "next/link";

export default async function Example() {
  const blogPosts = await fetchBlogPosts({});
  const filteredPosts = blogPosts.filter(post =>
    post.categories.some(category => category.name === "Case Study")
  );

  return (
    <div className="m-4 px-4 py-36 max-w-[1200px] mx-auto space-y-10">
      <div className="my-2">
        <Suspense fallback={<div>Loading...</div>}>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map(post => (
              <li
                key={post.slug}
                className="col-span-1 divide-y divide-gray-200 rounded-lg"
              >
                <article
                  key={post.slug}
                  className="flex flex-col items-start justify-between"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative w-full">
                      <Image
                        src={`https:${post.image?.src}`}
                        alt=""
                        className="aspect-[3/4] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/4] lg:aspect-[3/4]"
                        width={640}
                        height={426}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </Link>
                  <div className="mt-4 space-x-1 text-gray-500 flex justify-end">
                    {post.categories.map(category => {
                      if (category.name != "Case Study") {
                        return <div key={category.name}>{category.name}</div>;
                      }
                    })}
                  </div>
                  <div className="max-w-xl space-y-3 mt-2">
                    <div className="group relative">
                      <h3 className="text-lg font-semibold leading-6 group-hover:text-gray-500">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
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
