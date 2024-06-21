import { useListArticleSearchKeywordsQuery } from "@/graphql/generated";

const useArticleSearchKeywords = () => {
  const { data, loading, refetch } = useListArticleSearchKeywordsQuery();
  const keywords = data?.articleSearchKeywords;

  return {
    keywords,
    loading,
    refetch,
  };
};

export default useArticleSearchKeywords;
