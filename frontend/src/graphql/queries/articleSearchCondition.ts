import { gql } from "@apollo/client";

const LIST_ARTICLE_SEARCH_CONDITIONS = gql`
  query ListArticleSearchConditions {
    articleSearchConditions {
      id
      description
      countries
      createdAt
    }
  }
`;

export { LIST_ARTICLE_SEARCH_CONDITIONS };
