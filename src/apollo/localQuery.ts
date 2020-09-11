import { gql } from "@apollo/client";

export const IS_LOGIN = gql`
  query {
    isLogin @client
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    user @client
  }
`;
