"use client";

import CollectionViewLayout from "@/components/molecules/CollectionViewLayout";
import Flag from "@/components/molecules/Flag";
import ArticlesNavigation from "@/components/organisms/ArticlesNavigation";
import { CountryEnum } from "@/graphql/generated";
import useArticleSearchKeywordsTable from "@/hooks/useArticleSearchKeywordsTable";
import { DataGridPro } from "@mui/x-data-grid-pro";

const ArticleSearchKeywords = () => {
  const { columns, rows, loading } = useArticleSearchKeywordsTable({
    renderCountries: (countries: CountryEnum[]) => {
      return (
        <div className="flex space-x-2">
          {countries.map(country => {
            return <Flag key={country} code={country} />;
          })}
        </div>
      );
    },
  });

  return (
    <CollectionViewLayout navigation={<ArticlesNavigation />} loading={loading}>
      <div className="grow overflow-hidden h-full">
        <DataGridPro columns={columns} rows={rows} />
      </div>
    </CollectionViewLayout>
  );
};

export default ArticleSearchKeywords;
