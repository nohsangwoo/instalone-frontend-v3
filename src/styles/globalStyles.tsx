import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
// typescript 적용한 styled global theme 사용법

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
      background-color:${props => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:${props => props.theme.fontColor};
    }
    a {
      text-decoration: none;
      color:inherit;
    }
    input{
      color:#000;
    }
`;
