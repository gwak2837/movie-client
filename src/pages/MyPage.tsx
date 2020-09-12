import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "apollo/cache";
import { ICurrentUserData } from "interfaces";
import React from "react";
import { useHistory } from "react-router-dom";

function MyPage() {
  const history = useHistory();
  const currentUser = useQuery<ICurrentUserData>(GET_CURRENT_USER);
  const user = currentUser.data?.user;

  if (user === null) history.replace("/login");

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
