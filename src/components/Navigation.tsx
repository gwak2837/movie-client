import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ICurrentUserData } from "interfaces";
import { GET_CURRENT_USER } from "apollo/cache";

function Navigation() {
  const currentUser = useQuery<ICurrentUserData>(GET_CURRENT_USER);
  const user = currentUser.data?.user;

  return (
    <div className="nav">
      <Link to="/">Home</Link> <Link to="/about">About</Link>{" "}
      {user ? (
        <>
          <Link to="/logout">로그아웃</Link>{" "}
          <Link to={`/@${user.ID}`}>내 정보</Link>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link> <Link to="/signup">회원가입</Link>
        </>
      )}
    </div>
  );
}

export default Navigation;
