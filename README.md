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
