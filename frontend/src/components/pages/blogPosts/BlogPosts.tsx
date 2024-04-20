import { fetchBlogPosts } from "@/contentful/blogPost";
import { Suspense } from "react";
import Image from "next/image";
import formatDate from "@/utilities/formatDate";
import Link from "next/link";

export default async function BlogPosts() {
  const blogPosts = await fetchBlogPosts({});
  console.log(blogPosts[0].categories);
  return (
    <div className="m-4 px-4 py-36 max-w-[1200px] mx-auto space-y-10">
      <div className="my-2">
        <Suspense fallback={<div>Loading...</div>}>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogPosts.map(post => (
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
                        alt={post.title}
                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        width={640}
                        height={426}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </Link>
                  <div className="max-w-xl space-y-3 mt-4">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.publishedDate} className="">
                        {formatDate(post.publishedDate)}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="text-lg font-semibold leading-6 group-hover:text-gray-500">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                    </div>
                    <p className="line-clamp-3 text-sm leading-6">
                      {post.shortDescription}
                    </p>
                    <div className="space-x-1">
                      {post.categories.map(category => {
                        return (
                          <div
                            className="badge badge-primary badge-outline"
                            key={category.name}
                          >
                            {category.name}
                          </div>
                        );
                      })}
                    </div>
                    <div className="relative mt-4 flex items-center gap-x-4">
                      <Image
                        src={`https:${post.author?.avatar?.src || ""}`}
                        alt={post.author?.name || ""}
                        className="h-10 w-10 rounded-full bg-gray-100 object-cover"
                        width={640}
                        height={426}
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold">
                          <span className="absolute inset-0" />
                          {post.author?.name}
                        </p>
                        <p className="">{post.author?.title}</p>
                      </div>
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
