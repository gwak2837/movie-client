import React from "react";
import { useQuery } from "@apollo/client";
import { ICurrentUserData } from "interfaces";
import { GET_CURRENT_USER } from "apollo/localQuery";

function MyPage({ history }: any) {
  const currentUser = useQuery<ICurrentUserData>(GET_CURRENT_USER);
  const user = currentUser.data?.user;

  if (user === null) {
    alert("로그인 페이지로 이동합니다.");
    history.push("/login");
  }

  return (
    <div>
      <h2>MyPage</h2>
      <h4>ID</h4>
      <div>{user?.ID}</div>
      <h4>Token</h4>
      <div>{user?.token}</div>
      <h4>Name</h4>
      <div>{user?.name}</div>
    </div>
  );
}

export default MyPage;
