import { Company } from "@/contentful/company";
import { countries } from "@/constants/countries";
import { industries } from "@/constants/industries";
import RichText from "@/components/organisms/RichText";

type PropsType = {
  country: string;
  industry: string;
  companies: Company[];
};

export default function FinderCompanies({
  country,
  industry,
  companies,
}: PropsType) {
  const countryName = countries[country as keyof typeof countries];
  const industryName = Object.values(industries).find(
    ind => ind.url === industry
  )?.name;

  return (
    <div className="m-4 px-4 py-4 max-w-[1200px] mx-auto space-y-10">
      <div className="my-2">
        {companies.length > 0 ? (
          <div>
            <div className="py-2">
              <h1 className="text-xl font-bold">
                Companies in {countryName} in the {industryName} industry
              </h1>
            </div>
            <ul
              role="list"
              className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-8"
            >
              {companies.map(company => (
                <li
                  key={company.name}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <div className="text-lg font-medium leading-6 text-gray-900">
                      {company.name}
                    </div>
                  </div>
                  <dl className="px-6 py-4 leading-6">
                    {company.description && (
                      <div>
                        <RichText document={company.description} />
                      </div>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold">
              No companies found in {countryName} in the {industryName} industry
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
