import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ICurrentUserData, ILogoutData } from "interfaces";
import { currentUserVar, GET_CURRENT_USER } from "apollo/cache";
import Loading from "components/Loading";
import Error from "components/Error";
import { useHistory } from "react-router-dom";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

function Logout() {
  const history = useHistory();
  const currentUser = useQuery<ICurrentUserData>(GET_CURRENT_USER);
  const [logout, logoutResult] = useMutation<ILogoutData>(LOGOUT);

  useEffect(() => {
    if (logoutResult.data?.logout === true) {
      currentUserVar(null);
      alert("로그아웃에 성공했습니다");
      history.replace("/");
    } else if (logoutResult.data?.logout === false) {
      alert("로그아웃에 실패했습니다");
    }
  }, [logoutResult.data, history]);

  if (currentUser.data?.user === null) history.replace("/login");
  if (logoutResult.loading) return <Loading />;
  if (logoutResult.error) return <Error msg={logoutResult.error.message} />;

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    logout();
  }

  return (
    <button type="button" onClick={handleClick}>
      로그아웃
    </button>
  );
}

export default Logout;
