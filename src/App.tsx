import { useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { darkModeVar, isLoggedInVar } from './apollo';
import { ThemeProvider } from 'styled-components';

const lightTheme = {
  fontColor: '#2c2c2c',
  bgColor: 'lightgray',
};

const darkTheme = {
  fontColor: 'lightgray',
  bgColor: '#2c2c2c',
};

function App() {
  // isLoggedInVar는 apollo.tsx파일에서 makeVar를 이용하여 선언됐지만
  // 이것을 react components전체에서 사용하고싶다면 이런식으로 hook설정을 해주면됨
  // 이제 하위 컴포넌트 어디서든 isLoggedInVar(true)이런 형식으로 사용 가능
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
