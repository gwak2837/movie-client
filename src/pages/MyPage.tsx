import React from "react";

function MyPage({ history }: any) {
  if (!user?.ID) {
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
