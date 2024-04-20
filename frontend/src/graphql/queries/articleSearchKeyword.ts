import { gql } from "@apollo/client";

const LIST_ARTICLE_SEARCH_KEYWORDS = gql`
  query ListArticleSearchKeywords {
    articleSearchKeywords {
      id
      keyword
      language
      createdAt
      searchCondition {
        description
        countries
      }
    }
  }
`;

export { LIST_ARTICLE_SEARCH_KEYWORDS };
