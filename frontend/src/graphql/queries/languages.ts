import { gql } from "@apollo/client";

const LANGUAGES = gql`
  query languages {
    languages {
      id
      name
    }
  }
`;

export { LANGUAGES };
