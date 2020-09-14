import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ICurrentUserData, ILoginData, ILoginVars } from "interfaces";
import { currentUserVar, GET_CURRENT_USER } from "apollo/cache";
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

function Login() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const currentUserResult = useQuery<ICurrentUserData>(GET_CURRENT_USER);
  const [login, loginResult] = useMutation<ILoginData, ILoginVars>(LOGIN);

  const currentUser = currentUserResult.data?.user;
  const loginData = loginResult.data?.login;

  useEffect(() => {
    if (loginData) {
      currentUserVar(loginData);
      alert("로그인에 성공했습니다.");
      history.replace("/");
    } else if (loginData === null)
      alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
    return () => {
      if (loginData) {
        alert("끝");
      }
    };
  }, [loginData, history]);

  if (currentUser) history.replace("/");
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
