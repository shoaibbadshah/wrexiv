import { gql } from "@apollo/client";

const GENERATE_CONTENT = gql`
  mutation GenerateContent($input: GenerateContentInput!) {
    generateContent(input: $input) {
      posts {
        output
        platform
        language
      }
    }
  }
`;

export { GENERATE_CONTENT };
