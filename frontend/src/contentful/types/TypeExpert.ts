import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeExpertFields {
  name: EntryFieldTypes.Symbol;
  image: EntryFieldTypes.AssetLink;
  title?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
}

export type TypeExpertSkeleton = EntrySkeletonType<TypeExpertFields, "expert">;
export type TypeExpert<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeExpertSkeleton, Modifiers, Locales>;
