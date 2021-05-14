// src/assets/styles/styled.d.ts
import 'styled-components';

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
