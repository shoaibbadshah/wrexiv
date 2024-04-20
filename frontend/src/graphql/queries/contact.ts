import { gql } from "@apollo/client";

const LIST_COMPANY_CONTACTS = gql`
  query ListCompanyContacts($companyUrl: String!) {
    companyContacts(companyUrl: $companyUrl) {
      email
      name
      accuracy
      sources
    }
  }
`;

const LIST_LEAD_CONTACTS = gql`
  query ListLeadContacts($leadIds: [UUID!]!) {
    leadContacts(leadIds: $leadIds) {
      email
      name
    }
  }
`;

export { LIST_COMPANY_CONTACTS, LIST_LEAD_CONTACTS };
