import { BlogPost } from "@/contentful/blogPost";

export default function ArticleCard({ blogPost }: { blogPost: BlogPost }) {
  return (
    <article
      key={blogPost.slug}
      className="flex flex-col items-start justify-between"
    >
      <div>{blogPost.title}</div>
      {false && (
        <>
          {/* <a href={entry.href}>
            <div className="relative w-full">
              <img
                src={article.imageUrl}
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
          </a>
          <div className="max-w-xl">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <time dateTime={entry.sys.updatedAt} className="text-white">
                {entry.sys.updatedAt}
              </time>
              <a
                // href={article.category.href}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-primary hover:bg-gray-100"
              >
                {entry.category}
              </a>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-white">
                <a href={entry.href}>
                  <span className="absolute inset-0" />
                  {entry.title}
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-white">
                {entry.description}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={entry.author.imageUrl}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-100"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-white">
                  <a href={entry.author.href}>
                    <span className="absolute inset-0" />
                    {entry.author.name}
                  </a>
                </p>
                <p className="text-white">{entry.author.role}</p>
              </div>
            </div>
          </div> */}
        </>
      )}
    </article>
  );
}
