import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

// backend와 연결하기 위한 주소 세팅
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// setContext함수는 클라이언트의 모든 Request에 몇가지 항목을 추가하는 일을 한다
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      // 기존의 headers내용을 뿌려주고
      ...headers,
      // 그 위에 새로운 headers의 내용을 덮어 씌워준다.
      // backend로 전달하는 headers의 form을 맞춰줘야한다
      // client에선 headers{token:"some token"}으로 보내는데
      // backend에선 headers{tokkkkken: "some token"} 이란 형식으로 받아서 사용한다던지
      // 이런경우를 방지하기위해 키값을 잘 지정해줘야함
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
