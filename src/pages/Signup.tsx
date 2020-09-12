import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ICurrentUserData, ISignupData, ISignupVars } from "interfaces";
import Loading from "components/Loading";
import Error from "components/Error";
import { GET_CURRENT_USER } from "apollo/cache";

const SIGNUP = gql`
  mutation signup($ID: String!, $password: String!, $name: String!) {
    signup(ID: $ID, password: $password, name: $name)
  }
`;

function Signup() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const currentUser = useQuery<ICurrentUserData>(GET_CURRENT_USER);
  const [signup, signupResult] = useMutation<ISignupData, ISignupVars>(SIGNUP);

  useEffect(() => {
    if (signupResult.data?.signup === true) {
      alert("회원가입에 성공했습니다");
      history.replace("/login");
    } else if (signupResult.data?.signup === false) {
      alert("회원가입에 실패했습니다");
    }
  }, [signupResult.data, history]);

  if (currentUser.data?.user) history.replace("/");
  if (signupResult.loading) return <Loading />;
  if (signupResult.error) return <Error msg={signupResult.error.message} />;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    signup({ variables: { ID, password, name } });
    setID("");
    setPassword("");
    setName("");
  }

  return (
    <div>
      <div>회원가입</div>
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
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="이름"
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
