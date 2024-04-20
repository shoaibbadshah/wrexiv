import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeComponentAuthorFields {
  internalName: EntryFieldTypes.Symbol;
  name: EntryFieldTypes.Symbol;
  avatar?: EntryFieldTypes.AssetLink;
  title?: EntryFieldTypes.Symbol;
}

export type TypeComponentAuthorSkeleton = EntrySkeletonType<
  TypeComponentAuthorFields,
  "componentAuthor"
>;
export type TypeComponentAuthor<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeComponentAuthorSkeleton, Modifiers, Locales>;
