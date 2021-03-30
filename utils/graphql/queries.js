import { gql } from "@apollo/client";

export const ALL_USERS = gql`
  query {
    users {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const ALL_PRODUCTS = gql`
  query {
    products {
      id
      title
      price
      createdBy {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
