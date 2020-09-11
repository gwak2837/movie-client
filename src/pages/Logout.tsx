import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ILogoutData, ICurrentUserData } from "interfaces";
import { GET_CURRENT_USER } from "apollo/localQuery";
import { currentUserVar } from "apollo/client";
import Loading from "components/Loading";
import Error from "components/Error";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

function Logout({ history }: any) {
  const currentUser = useQuery<ICurrentUserData>(GET_CURRENT_USER);
  const [logout, logoutResult] = useMutation<ILogoutData>(LOGOUT);

  if (currentUser.data?.user === null) history.replace("/");

  useEffect(() => {
    if (logoutResult.data?.logout === true) {
      currentUserVar(null);
      alert("로그아웃에 성공했습니다");
    } else if (logoutResult.data?.logout === false) {
      alert("로그아웃에 실패했습니다");
    }
  }, [logoutResult.data]);

  if (logoutResult.loading) return <Loading />;
  if (logoutResult.error) return <Error msg={logoutResult.error.message} />;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        logout();
      }}
    >
      로그아웃
    </button>
  );
}

export default Logout;
