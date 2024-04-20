import {
  TypeCountryValue,
  TypeIndustryValue,
  TypeCompanySkeleton,
} from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import client from "@/lib/contentful";

type CompanyEntry = Entry<TypeCompanySkeleton, undefined, string>;

export interface Company {
  name: string;
  description: RichTextDocument | null;
  country: TypeCountryValue;
  industry: TypeIndustryValue;
}

export function parseContentfulCompany(
  companyEntry?: CompanyEntry
): Company | null {
  if (!companyEntry) {
    return null;
  }

  return {
    name: companyEntry.fields.name,
    description: companyEntry.fields.description || null,
    country: companyEntry.fields.country,
    industry: companyEntry.fields.industry,
  };
}

interface FetchAllCompaniesOptions {
  preview?: boolean;
}

export async function fetchAllCompanies({
  preview,
}: FetchAllCompaniesOptions): Promise<Company[]> {
  const companyResult = await client.getEntries<TypeCompanySkeleton>({
    content_type: "company",
    include: 2,
    order: ["-sys.createdAt"],
  });

  return companyResult.items.map(
    companyEntry => parseContentfulCompany(companyEntry) as Company
  );
}

// fetch company based on country and industry
interface FetchCompaniesByCountryAndIndustryOptions {
  country: TypeCountryValue;
  industry: TypeIndustryValue;
  preview?: boolean;
}
export type IndustryType =
  | "automobile"
  | "automobiles"
  | "startup"
  | "startups"
  | undefined;
export type CountryType =
  | "id"
  | "in"
  | "cn"
  | "hk"
  | "jp"
  | "ko"
  | "sg"
  | "uk"
  | "us"
  | "vn"
  | undefined;

export async function fetchCompaniesByCountryAndIndustry({
  country,
  industry,
  preview,
}: FetchCompaniesByCountryAndIndustryOptions): Promise<Company[]> {
  const companyResult = await client.getEntries<TypeCompanySkeleton>({
    content_type: "company",
    include: 2,
    order: ["-sys.contentType.sys.id"],
    "fields.country": country,
    "fields.industry": industry,
  });

  return companyResult.items.map(
    companyEntry => parseContentfulCompany(companyEntry) as Company
  );
}
