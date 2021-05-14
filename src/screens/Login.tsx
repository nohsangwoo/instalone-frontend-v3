import { isLoggedInVar } from '../apollo';

function Login() {
  return (
    <div>
      <h1>Plz. Login</h1>
      <button onClick={() => isLoggedInVar(true)}>Log in Now!</button>
    </div>
  );
}

export default Login;
