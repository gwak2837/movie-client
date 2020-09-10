import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { ILogoutData } from "interfaces";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

function Logout({ history }: any) {
  const [logout, { data }] = useMutation<ILogoutData>(LOGOUT);

  if (!user) history.replace("/");

  useEffect(() => {
    if (data?.logout) {
      localStorage.removeItem("token");
      setUser({});
      alert("로그아웃에 성공했습니다");
    } else if (data?.logout === null) alert("로그아웃에 실패했습니다");
  }, [data, setUser]);

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
