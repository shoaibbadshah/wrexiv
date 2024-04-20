import { CountryEnum } from "@/graphql/generated";
import useArticleSearchKeywords from "./useArticleSearchKeywords";
import { GridColDef } from "@mui/x-data-grid-pro";
import useTranslation from "./useTranslation";

const columns: GridColDef[] = [
  {
    field: "keyword",
    headerName: "Keyword",
    width: 200,
  },
  {
    field: "language",
    headerName: "Language",
    width: 120,
  },
  {
    field: "countries",
    headerName: "Countries",
    width: 120,
    renderCell: params => {
      return params.row.countries;
    },
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
];

type PropsType = {
  renderCountries: (countries: CountryEnum[]) => JSX.Element;
};

const useArticleSearchKeywordsTable = ({ renderCountries }: PropsType) => {
  const { keywords, loading } = useArticleSearchKeywords();
  const { t } = useTranslation();

  const rows =
    keywords?.map(keyword => {
      return {
        id: keyword.id,
        keyword: keyword.keyword,
        language: t(`languages.${keyword.language}`),
        description: keyword.searchCondition.description,
        countries: renderCountries(keyword.searchCondition.countries),
      };
    }) || [];

  return {
    keywords,
    columns,
    rows,
    loading,
  };
};

export default useArticleSearchKeywordsTable;
