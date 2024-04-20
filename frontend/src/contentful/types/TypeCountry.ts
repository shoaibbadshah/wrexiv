import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeCountryValue =
  | "cn"
  | "hk"
  | "id"
  | "in"
  | "jp"
  | "ko"
  | "sg"
  | "uk"
  | "us"
  | "vn";

export interface TypeCountryFields {
  code: EntryFieldTypes.Symbol<TypeCountryValue>;
  name: EntryFieldTypes.Symbol;
}

export type TypeCountrySkeleton = EntrySkeletonType<
  TypeCountryFields,
  "country"
>;
export type TypeCountry<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeCountrySkeleton, Modifiers, Locales>;
