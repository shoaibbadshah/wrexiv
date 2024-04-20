import FinderTop from "@/components/pages/finder/top/FinderTop";
import { FINDER_ARTICLES_TOP_BLOG_POSTS_LIMIT } from "@/constants/finder";
import { fetchBlogPosts } from "@/contentful/blogPost";
import { fetchExperts } from "@/contentful/expert";
import { fetchTools } from "@/contentful/tool";

export default async function FinderTopPage() {
  const tools = await fetchTools();
  const articles = await fetchBlogPosts({
    limit: FINDER_ARTICLES_TOP_BLOG_POSTS_LIMIT,
  });
  const experts = await fetchExperts();

  return <FinderTop tools={tools} articles={articles} experts={experts} />;
}
