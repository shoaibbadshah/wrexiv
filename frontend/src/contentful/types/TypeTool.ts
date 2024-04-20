import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeToolFields {
  name: EntryFieldTypes.Symbol;
  url: EntryFieldTypes.Symbol;
  image?: EntryFieldTypes.AssetLink;
  description?: EntryFieldTypes.RichText;
}

export type TypeToolSkeleton = EntrySkeletonType<TypeToolFields, "tool">;
export type TypeTool<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeToolSkeleton, Modifiers, Locales>;
