import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
// typescript 적용한 styled global theme 사용법

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${props => props.theme.bgColor};
    }
`;
