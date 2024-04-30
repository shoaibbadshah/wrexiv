import { gql } from "@apollo/client";

const LANGUAGES = gql`
  query languages {
    languages
  }
`;

export { LANGUAGES };
