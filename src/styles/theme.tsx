import { DefaultTheme } from 'styled-components';
// 여기 styled theme - typescript 적용

const lightTheme: DefaultTheme = {
  fontColor: '#2c2c2c',
  bgColor: 'lightgray',
};

const darkTheme: DefaultTheme = {
  fontColor: 'lightgray',
  bgColor: '#2c2c2c',
};

export { lightTheme, darkTheme };
