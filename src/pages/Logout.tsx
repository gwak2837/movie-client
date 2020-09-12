import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { ILogoutData } from "interfaces";
import { currentUserVar } from "apollo/cache";
import Loading from "components/Loading";
import Error from "components/Error";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

function Logout({ history }: any) {
  const [logout, logoutResult] = useMutation<ILogoutData>(LOGOUT);

  useEffect(() => {
    if (logoutResult.data?.logout === true) {
      currentUserVar(null);
      alert("로그아웃에 성공했습니다");
    } else if (logoutResult.data?.logout === false) {
      alert("로그아웃에 실패했습니다");
    }
  }, [logoutResult.data]);

  if (currentUserVar() === null) history.replace("/");
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
