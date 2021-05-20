import { logUserOut } from '../apollo';

function Home(): JSX.Element {
  return (
    <div>
      <h1>Welcome we did it!</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
  );
}

export default Home;
