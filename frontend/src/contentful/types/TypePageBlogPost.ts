import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeCategorySkeleton } from "./TypeCategory";
import type { TypeComponentAuthorSkeleton } from "./TypeComponentAuthor";
import type { TypeComponentSeoSkeleton } from "./TypeComponentSeo";

export interface TypePageBlogPostFields {
  internalName: EntryFieldTypes.Symbol;
  seoFields?: EntryFieldTypes.EntryLink<TypeComponentSeoSkeleton>;
  slug: EntryFieldTypes.Symbol;
  author?: EntryFieldTypes.EntryLink<TypeComponentAuthorSkeleton>;
  publishedDate: EntryFieldTypes.Date;
  title: EntryFieldTypes.Symbol;
  shortDescription?: EntryFieldTypes.Text;
  featuredImage: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
  relatedBlogPosts?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypePageBlogPostSkeleton>
  >;
  categories?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeCategorySkeleton>
  >;
}

export type TypePageBlogPostSkeleton = EntrySkeletonType<
  TypePageBlogPostFields,
  "pageBlogPost"
>;
export type TypePageBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypePageBlogPostSkeleton, Modifiers, Locales>;
