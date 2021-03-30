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

export const INSERT_TRANSACTION = gql`
  mutation($partnerId: String!) {
    createTransaction(input: { partnerId: $partnerId, status: "waiting" }) {
      id
      status
    }
  }
`;

export const INSERT_ORDERS = gql`
  mutation($inputs: [CreateOrderInput]) {
    createOrders(inputs: $inputs) {
      results {
        id
        product {
          id
          title
        }
        transaction {
          id
          status
        }
        createdBy {
          id
          email
        }
      }
    }
  }
`;
