import { gql } from "@apollo/client";

export const IS_LOGIN = gql`
  query {
    isUserLogin {
      isLogin @client
    }
  }
`;
