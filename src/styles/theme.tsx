import { DefaultTheme } from 'styled-components';
// 여기 styled theme - typescript 적용

const lightTheme: DefaultTheme = {
  accent: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
};

const darkTheme: DefaultTheme = {
  fontColor: 'white',
  bgColor: '#2c2c2c',
};

export { lightTheme, darkTheme };
