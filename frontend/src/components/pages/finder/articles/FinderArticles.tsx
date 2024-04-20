import { BlogPost } from "@/contentful/blogPost";
import Description from "../_ui/Description";
import Heading from "../_ui/Heading";
import Image from "next/image";

type FinderArticlesType = {
  articles: BlogPost[];
};

const FinderArticles = ({ articles }: FinderArticlesType) => {
  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <Heading level={2} link="/finder/articles">
        Articles
      </Heading>
      <Description>
        Vel dolorem qui facilis soluta sint aspernatur totam cumqu
      </Description>

      {/* articles */}
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:grid-cols-2">
        {articles.map(post => (
          <article
            key={post.slug}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            <Image
              src={`https:${post.image?.src || ""}`}
              alt={post.slug}
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <time dateTime={post.publishedDate} className="mr-8">
                {post.publishedDate}
              </time>
              <div className="-ml-4 flex items-center gap-x-4">
                <svg
                  viewBox="0 0 2 2"
                  className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="flex gap-x-2.5 items-center">
                  <div className="relative h-8 w-8">
                    <Image
                      src={`https:${post.author?.avatar?.src || ""}`}
                      alt={post.author?.name || ""}
                      className="object-cover h-6 w-6 flex-none rounded-full bg-white/10"
                      fill
                    />
                  </div>
                  {post.author?.name}
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
              <a href={`/blog/${post.slug}`}>
                <span className="absolute inset-0"></span>
                {post.title}
              </a>
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FinderArticles;
