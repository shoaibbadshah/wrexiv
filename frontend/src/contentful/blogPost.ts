import {
  TypeCategory,
  TypeCategorySkeleton,
  TypeComponentAuthorSkeleton,
  TypePageBlogPostSkeleton,
} from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import client from "@/lib/contentful";
import { ContentImage, parseContentfulContentImage } from "./contentImage";

type BlogPostEntry = Entry<TypePageBlogPostSkeleton, undefined, string>;
type CategoryEntry = Entry<TypeCategorySkeleton, undefined, string>;

// Our simplified version of a BlogPost.
// We don't need all the data that Contentful gives us.
export interface BlogPost {
  title: string;
  slug: string;
  body: RichTextDocument | null;
  image: ContentImage | null;
  publishedDate: string;
  shortDescription?: string;
  categories: {
    name: string;
  }[];
  author?: {
    name: string;
    avatar: ContentImage | null;
    title: string;
  };
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulBlogPost(
  blogPostEntry?: BlogPostEntry
): BlogPost | null {
  if (!blogPostEntry) {
    return null;
  }

  let author = undefined;
  if (blogPostEntry.fields.author && "fields" in blogPostEntry.fields.author) {
    author = {
      name: blogPostEntry.fields.author.fields.name,
      avatar: parseContentfulContentImage(
        blogPostEntry.fields.author.fields.avatar
      ),
      title: blogPostEntry.fields.author.fields.title || "",
    };
  }

  console.log(blogPostEntry.fields);

  const categories = blogPostEntry.fields.categories
    ? blogPostEntry.fields.categories
        .filter((category): category is CategoryEntry => "fields" in category)
        .map(category => {
          return {
            name: category.fields.name,
          };
        })
    : [];

  return {
    title: blogPostEntry.fields.title || "",
    slug: blogPostEntry.fields.slug,
    body: blogPostEntry.fields.content || null,
    image: parseContentfulContentImage(blogPostEntry.fields.featuredImage),
    publishedDate: blogPostEntry.fields.publishedDate,
    shortDescription: blogPostEntry.fields.shortDescription,
    author: author,
    categories: categories || [],
  };
}

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchBlogPostsOptions {
  preview?: boolean;
  limit?: number;
}
export async function fetchBlogPosts({
  preview,
  limit,
}: FetchBlogPostsOptions): Promise<BlogPost[]> {
  const blogPostsResult = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    include: 2,
    order: ["-sys.createdAt"],
    limit,
  });

  return blogPostsResult.items.map(
    blogPostEntry => parseContentfulBlogPost(blogPostEntry) as BlogPost
  );
}

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
interface FetchBlogPostOptions {
  slug: string;
  preview: boolean;
}
export async function fetchBlogPost({
  slug,
  preview,
}: FetchBlogPostOptions): Promise<BlogPost | null> {
  const blogPostsResult = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulBlogPost(blogPostsResult.items[0]);
}
