import { DefaultTheme } from 'styled-components';
// 여기 styled theme - typescript 적용

const lightTheme: DefaultTheme = {
  accent: '#0095f6',
  bgColor: '#FAFAFA',
  fontColor: 'rgb(38, 38, 38)',
  borderColor: 'rgb(219, 219, 219)',
};

const darkTheme: DefaultTheme = {
  fontColor: 'white',
  bgColor: '#000',
};

export { lightTheme, darkTheme };
