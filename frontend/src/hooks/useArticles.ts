import { useListArticlesQuery } from "@/graphql/generated";

const useArticles = () => {
  const { data, loading, refetch } = useListArticlesQuery();
  const articles = data?.articles;

  return { articles, loading, refetch };
};

export default useArticles;
