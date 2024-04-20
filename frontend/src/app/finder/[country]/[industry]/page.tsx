import {
  CountryType,
  fetchCompaniesByCountryAndIndustry,
  IndustryType,
} from "@/contentful/company";
import FinderCompanies from "@/components/pages/finder/company/FinderCompany";
import { notFound } from "next/navigation";

import { TypeIndustryValue, TypeCountryValue } from "@/contentful/types";

import { countries } from "@/constants/countries";
import { industries } from "@/constants/industries";

interface FinderCompanyPageParams {
  country: TypeCountryValue;
  industry: TypeIndustryValue;
}

interface FinderCompanyPageProps {
  params: FinderCompanyPageParams;
}

export default async function FinderCompanyPage({
  params,
}: FinderCompanyPageProps) {
  const countryCodes = Object.keys(countries);
  const industryUrls = Object.values(industries).map(ind => ind.url);
  const industryKeys = Object.keys(industries);

  if (
    !(
      countryCodes.includes(params.country) &&
      industryUrls.includes(params.industry)
    )
  ) {
    return notFound();
  }

  const companies = await fetchCompaniesByCountryAndIndustry({
    country: params.country,
    industry: industryKeys[
      industryUrls.indexOf(params.industry)
    ] as TypeIndustryValue,
    preview: false,
  });

  return (
    <FinderCompanies
      country={params.country}
      industry={params.industry}
      companies={companies}
    />
  );
}
