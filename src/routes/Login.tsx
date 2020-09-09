import React, { useState, useEffect, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { UserContext } from 'contexts';

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
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error, data }] = useMutation(LOGIN);
  const { user, setUser } = useContext(UserContext);

  if (user) history.replace('/');

  useEffect(() => {
    if (data?.login) {
      localStorage.setItem('token', data.login.token);
      setUser(data.login);
      alert('로그인에 성공했습니다.');
    } else if (data?.login === null)
      alert('아이디 또는 비밀번호를 잘못 입력했습니다.');
  }, [data, setUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <div>로그인</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ variables: { ID, password } });
          setID('');
          setPassword('');
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
