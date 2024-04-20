import { GetArticleQuery, useGetArticleQuery } from "@/graphql/generated";

type PropsType = {
  id?: string;
  onComplated?: (article: GetArticleQuery["article"]) => void;
};

const useArticle = ({ id, onComplated }: PropsType = {}) => {
  const { data, loading, refetch } = useGetArticleQuery({
    variables: {
      id: id || "",
    },
    skip: !id,
    onCompleted: data => {
      if (onComplated) {
        onComplated(data.article);
      }
    },
  });
  const article = data?.article;

  return {
    article,
    loading,
    refetch,
  };
};

export default useArticle;
