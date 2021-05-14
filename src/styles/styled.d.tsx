// src/assets/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  type chageColor = '#2c2c2c' | 'lightgray';

  export interface DefaultTheme {
    fontColor?: chageColor;
    bgColor?: chageColor;

    colors?: {
      main: string;
      sub: string;
    };
  }
}
