import { gql } from "@apollo/client";

const CREATE_TALENT_USER_INVITATION = gql`
  mutation CreateTalentUserInvitation(
    $input: CreateTalentUserInvitationInput!
  ) {
    createTalentUserInvitation(input: $input) {
      success
    }
  }
`;

export { CREATE_TALENT_USER_INVITATION };
