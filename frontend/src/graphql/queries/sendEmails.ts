import { gql } from "@apollo/client";

const SEND_EMAILS = gql`
  mutation SendEmails($input: SendEmailsInputType!) {
    sendEmails(input: $input) {
      success
    }
  }
`;

export { SEND_EMAILS };
