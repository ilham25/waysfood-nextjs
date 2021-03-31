import { gql } from "@apollo/client";

export const ALL_USERS = gql`
  query {
    users {
      id
      email
      firstName
      lastName
      role
      image
    }
  }
`;

export const ALL_PRODUCTS = gql`
  query {
    products {
      id
      title
      price
      image
      createdBy {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const ALL_TRANSACTIONS = gql`
  query {
    transactions {
      id
      status
      partner {
        id
        email
        firstName
        lastName
      }
      createdBy {
        id
        email
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const ALL_ORDERS = gql`
  query {
    orders {
      id
      transaction {
        id
        createdBy {
          id
        }
      }
      product {
        id
        title
        price
      }
      qty
    }
  }
`;

export const EACH_PRODUCT = gql`
  query($id: String!) {
    product(id: $id) {
      id
      title
      price
      image
    }
  }
`;
