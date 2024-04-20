import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { fetchBlogPost, fetchBlogPosts } from "@/contentful/blogPost";
import Link from "next/link";
import RichText from "@/components/organisms/RichText";

interface BlogPostPageParams {
  slug: string;
}

interface BlogPostPageProps {
  params: BlogPostPageParams;
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const blogPosts = await fetchBlogPosts({ preview: false });

  return blogPosts.map(post => ({ slug: post.slug }));
}

// For each blog post, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blogPost = await fetchBlogPost({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!blogPost) {
    return notFound();
  }

  return {
    title: blogPost.title,
  };
}

// The actual BlogPostPage component.
async function BlogPostPage({ params }: BlogPostPageProps) {
  // Fetch a single blog post by slug,
  // using the content preview if draft mode is enabled:
  const blogPost = await fetchBlogPost({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!blogPost) {
    // If a blog post can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  return (
    <main className="p-[6vw] max-w-[1000px] mx-auto pt-24 pb-40">
      <Link href="/blog">← Posts</Link>
      <div className="prose mt-8 border-t pt-8 space-y-8">
        {blogPost.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-full" // This class ensures the image takes full width of its container
            src={blogPost.image.src}
            srcSet={`${blogPost.image.src}?w=300 1x, ${blogPost.image.src}?w=600 2x`}
            alt={blogPost.image.alt}
          />
        )}
        <h1 className="text-3xl font-bold">{blogPost.title}</h1>
        <div>
          <RichText document={blogPost.body} />
        </div>
      </div>
    </main>
  );
}

export default BlogPostPage;
