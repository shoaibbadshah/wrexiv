import { gql } from "@apollo/client";

const GENERATE_ARTICLES = gql`
  mutation GenerateArticles($input: GenerateArticlesInput!) {
    generateArticles(input: $input) {
      articles {
        id
      }
    }
  }
`;

const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      snippet
      summary
      bodyOriginal
      bodyTranslated
      sourceUrl
      publishedDate
      coverImage
      countries
      language
      createdAt
    }
  }
`;

const LIST_ARTICLES = gql`
  query ListArticles {
    articles {
      id
      title
      snippet
      summary
      bodyOriginal
      bodyTranslated
      sourceUrl
      publishedDate
      coverImage
      countries
      language
      createdAt
    }
  }
`;

const ADD_SUMMARY_TO_ARTICLE = gql`
  mutation AddSummaryToArticle($input: AddSummaryToArticleInput!) {
    addSummaryToArticle(input: $input) {
      article {
        id
        summary
      }
    }
  }
`;

const ADD_TRANSLATION_TO_ARTICLE = gql`
  mutation AddTranslationToArticle($input: AddTranslationToArticleInput!) {
    addTranslationToArticle(input: $input) {
      article {
        id
        bodyTranslated
      }
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      success
    }
  }
`;

export {
  GENERATE_ARTICLES,
  LIST_ARTICLES,
  ADD_SUMMARY_TO_ARTICLE,
  ADD_TRANSLATION_TO_ARTICLE,
  GET_ARTICLE,
  DELETE_ARTICLE,
};
