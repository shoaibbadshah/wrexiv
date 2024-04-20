import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

import { TypeCountryValue } from "./TypeCountry";

export type TypeIndustryValue =
  | "automobile"
  | "automobiles"
  | "startup"
  | "startups";

export interface TypeCompanyFields {
  name: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
  country: EntryFieldTypes.Symbol<TypeCountryValue>;
  industry: EntryFieldTypes.Symbol<TypeIndustryValue>;
}

export type TypeCompanySkeleton = EntrySkeletonType<
  TypeCompanyFields,
  "company"
>;
export type TypeCompany<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeCompanySkeleton, Modifiers, Locales>;
