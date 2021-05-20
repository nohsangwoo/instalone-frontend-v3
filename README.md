# Instaclone Web

# 8.1 Installing All

- styled components
  https://styled-components.com/
- react-hook-form
  https://react-hook-form.com/
- react-router-dom
  https://reactrouter.com/web/guides/quick-start
- @apollo/client graphql
  https://www.apollographql.com/docs/react/get-started/
- react-helmet-async
  https://www.npmjs.com/package/react-helmet-async

```
npm i styled-components react-hook-form react-router-dom @apollo/client graphql react-helmet-async
```

- react fortawesome
  npm i --save @fortawesome/fontawesome-svg-core
  npm install --save @fortawesome/free-solid-svg-icons
  npm install --save @fortawesome/react-fontawesome
  npm install --save @fortawesome/free-brands-svg-icons
  npm install --save @fortawesome/free-regular-svg-icons
  ***
  "@apollo/client": "^3.3.11",
  "@fortawesome/fontawesome-svg-core": "^1.2.34",
  "@fortawesome/free-brands-svg-icons": "^5.15.2",
  "@fortawesome/free-regular-svg-icons": "^5.15.2",
  "@fortawesome/free-solid-svg-icons": "^5.15.2",
  "@fortawesome/react-fontawesome": "^0.1.14",
  graphql": "^15.5.0",
  "react-helmet-async": "^1.0.7",
  "react-hook-form": "^6.15.1",
  "react-router-dom": "^5.2.0",
  "styled-components": "^5.2.1",

# 8.2 What Does Setup Mean?

- [x] Router
- [x] Authentication
- [x] Arch.
- [x] Styles
- [ ] Log In / Sign Up

# 8.3 Router Setup part

# 8.6 Reactive Variables

- 사용법

1. makeVar를 이용하여 선언
2. app.tsx파일(최상단 경로)에서 useReactiveVar로 hooks설정해줌
3. 어디서든 선언된 변수명(설정하고싶은 값)형식으로 사용가능
<!-- isLoggedInVar(false) -->

- cache 기능등 참고
  https://github.com/apollographql/ac3-state-management-examples/tree/master/apollo-local-state/src

# 8.9 GlobalStyles on Styled Components

- apply styled-reset

# typescript for graphql

- 적용하려면 백엔드가 typescript로 작성돼있어야함
- npm install -g apollo
  apollo client:codegen
  https://github.com/apollographql/apollo-tooling#apollo-clientcodegen-output 참고
- graphql 서버에서 스키마를 다운로드 받아 적용할것임
- configuration파일 생성 (apollo.config.js)
  https://www.apollographql.com/docs/devtools/apollo-config/

- 백엔드에서 스키마 끌어오기

```
apollo client:codegen src/__generated__ --target=typescript --outputFlat
```

# 10.1 Login UI Clone (18:40)

- [ ] Feed
- [ ] Profile
- [ ] See Hashtag

# 10.5 Forms in React

# 10.6 Helmet Component

- react helmet 사용법
  https://www.npmjs.com/package/react-helmet

# 10.7 React Hook Form

- react hook form 사용법
  https://react-hook-form.com/

# 일반 react form Typescript 적용 예시

```
  <!-- typescript 적용 예시 -->
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError('');
    setUsername(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === '') {
      setUsernameError('Not empty pls.');
    }
    if (username.length < 10) {
      setUsernameError('too short');
    }
  };
  .....
  .....

  return(
    <form onSubmit={handleSubmit}>
      {usernameError}
      <Input
        onChange={onUsernameChange}
        value={username}
        type="text"
        placeholder="Username"
    />
    ...
  )
```

# 10.9 Apollo Client

- backend와 연결

# 10.11 Login part Two

- useForm과 apollo hook, apollo reactive variable, localStorage등을 이용하여 로그인 상태 관리
- https://www.youtube.com/watch?v=ZBfBiwyR2HY 참고

- onChange 사용시 react hooks form 이 깨져버리는? 상태 발생
- setError 사용법 연구 필요

# 10.13 Redirecting Users

- useHistory를 이용하여 변수와 함께 push 하고 useLocation이용하여 변수와 함께 props를 받아옴

# 10.14 Dark Mode

- darkmode세팅

# 11.0 Header and Layout

- 로그인 한 상태의 home에서 최상위 레이아웃 설계
- navigation..

# 11.1 Header part Two

- header 부분 아이콘 추가 및 마무리

# 11.2 Header part Three

- localStorage에 저장된 token을 꺼내다 우리의 http의 header에 넣어서 사용하기위한 설정
- 사용자가 브라우저에서 전달받은 토큰을 변경하여 장난치면 바로 로그아웃됨

# 11.6 isLiked

- 내가 해당 feed에 like를 했는지 여부
- like테이블에서 연결된 photoId와 userId를 찾아서 해당조건에 만족하는 like가 있으면 true를 반환하고 없으면 false를 반환한다.
