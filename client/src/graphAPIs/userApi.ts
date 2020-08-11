import { gql } from "@apollo/client";

export interface User {
  id: string;
  username: string;
}

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const USER_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const USER_REGISTER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      username
    }
  }
`;
