import React from 'react';

type Props = {
  setIsLoggedIn: (args: boolean) => void;
};

function Login({ setIsLoggedIn }: Props) {
  return (
    <div>
      <h1>Plz. Login</h1>
      <button onClick={() => setIsLoggedIn(true)}>Log in Now!</button>
    </div>
  );
}

export default Login;
