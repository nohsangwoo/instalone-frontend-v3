// src/assets/styles/styled.d.ts
import 'styled-components';
// 여기 styled theme - typescript 적용

declare module 'styled-components' {
  export interface DefaultTheme {
    fontColor?: '#2c2c2c' | 'lightgray';
    bgColor?: '#2c2c2c' | 'lightgray';

    colors?: {
      main: string;
      sub: string;
    };
  }
}
