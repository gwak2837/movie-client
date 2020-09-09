import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGNUP = gql`
  mutation signup($ID: String!, $password: String!, $name: String!) {
    signup(ID: $ID, password: $password, name: $name)
  }
`;

function Signup() {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signup, { data }] = useMutation(SIGNUP);

  useEffect(() => {
    if (data?.signup === true) alert('회원가입에 성공했습니다');
    else if (data?.signup === false) alert('회원가입에 실패했습니다');
  }, [data]); //DEBUG

  return (
    <div>
      <div>회원가입</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup({ variables: { ID, password, name } });
        }}
      >
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
