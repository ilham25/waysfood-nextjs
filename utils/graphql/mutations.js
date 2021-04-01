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

export const REGISTER_MUTATION = gql`
  mutation(
    $email: EmailAddress!
    $password: String!
    $firstName: String!
    $lastName: String
    $phoneNumber: PhoneNumber
    $role: RegisterRole
  ) {
    register(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        role: $role
      }
    ) {
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

export const INSERT_PRODUCT = gql`
  mutation($title: String!, $price: Int!, $image: String!) {
    createProduct(input: { title: $title, price: $price, image: $image }) {
      id
      title
      price
      image
      createdBy {
        id
        email
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($id: String!) {
    deleteProduct(id: $id) {
      id
      title
      price
      image
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation($id: String!, $title: String, $image: String, $price: Int) {
    updateProduct(
      input: { title: $title, image: $image, price: $price }
      id: $id
    ) {
      id
      title
      image
      price
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation($status: String!, $id: String!) {
    updateTransaction(input: { status: $status }, id: $id) {
      id
      status
    }
  }
`;
