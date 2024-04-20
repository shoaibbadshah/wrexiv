import FinderArticles from "@/components/pages/finder/articles/FinderArticles";
import { fetchBlogPosts } from "@/contentful/blogPost";
import { notFound } from "next/navigation";

const FinderArticlesPage = async () => {
  const articlesData = await fetchBlogPosts({});

  if (!articlesData) {
    return notFound();
  }

  return <FinderArticles articles={articlesData} />;
};

export default FinderArticlesPage;
