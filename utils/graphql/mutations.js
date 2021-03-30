import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation($email: EmailAddress!, $password: String) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        firstName
        lastName
        email
        phoneNumber
        role
        image
      }
    }
  }
`;
