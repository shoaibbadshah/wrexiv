import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeKindValue =
  | "design"
  | "development_work"
  | "global_expansion_project"
  | "product";
export interface TypeCaseStudyFields {
  title: EntryFieldTypes.Symbol;
  kind: EntryFieldTypes.Symbol<TypeKindValue>;
  image?: EntryFieldTypes.AssetLink;
  slug?: EntryFieldTypes.Symbol;
  topic: EntryFieldTypes.Symbol<
    "Design" | "Global Expansion" | "Product" | "Software Development"
  >;
}

export type TypeCaseStudySkeleton = EntrySkeletonType<
  TypeCaseStudyFields,
  "caseStudy"
>;
export type TypeCaseStudy<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeCaseStudySkeleton, Modifiers, Locales>;
