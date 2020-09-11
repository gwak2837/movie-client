import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { ILoginData, ILoginVars } from "interfaces";
import { currentUserVar } from "apollo/client";
import Loading from "components/Loading";
import Error from "components/Error";

const LOGIN = gql`
  mutation login($ID: String!, $password: String!) {
    login(ID: $ID, password: $password) {
      ID
      name
      role
      token
    }
  }
`;

function Login({ history }: any) {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginResult] = useMutation<ILoginData, ILoginVars>(LOGIN);

  useEffect(() => {
    if (loginResult.data?.login) {
      currentUserVar(loginResult.data?.login);
      alert("로그인에 성공했습니다.");
    } else if (loginResult.data?.login === null)
      alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
  }, [loginResult.data]);

  if (currentUserVar()) history.replace("/");
  if (loginResult.loading) return <Loading />;
  if (loginResult.error) return <Error msg={loginResult.error.message} />;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    login({ variables: { ID, password } });
    setID("");
    setPassword("");
  }

  return (
    <div>
      <div>로그인</div>
      <form onSubmit={handleSubmit}>
        <input
          value={ID}
          onChange={(e) => setID(e.target.value)}
          type="text"
          placeholder="ID"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
