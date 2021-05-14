import React from 'react';
type Props = {
  setIsLoggedIn: (args: boolean) => void;
};
function Home({ setIsLoggedIn }: Props) {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn(false)}>Log out Now!</button>
    </div>
  );
}

export default Home;
