import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

// token constance
const TOKEN = 'TOKEN';
const DARK_MODE = 'DARK_MODE';

// isLoggedInVar이란 이름의 reactive variable을 생성하는데
// 초기값은 localStorage에 저장된 token이 존재하면 true 존재하지 않으면 false로 지정
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// user가 로그인에 성공하면 token을 반환받는데 이때
// token을 localStorage에 저장하고 reactive variable에서 isLoggedInvar를 true로 설정해준다
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

// user가 로그아웃에 성공하면 이때
// localStorage에 저장된 token을 제거하고 reactive variable에서 isLoggedInvar를 false로 설정해준다
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

// darkMode의 상태를 위한 reactive variable
// darkmode설정이 localstorage에 존재하면 true 아니라면 false로 초기화
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

// localStorage에 DARK_MODE라는 키값에 enabled 값 저장
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, 'enabled');
  darkModeVar(true);
};

// localStorage에 DARK_MODE라는 키값삭제 후 reactive variable인 darkModeVar의 값을 false로 지정
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// ------ end of darkmode settings

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
