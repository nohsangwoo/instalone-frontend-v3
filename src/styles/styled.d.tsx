// src/assets/styles/styled.d.ts
import 'styled-components';
// 여기 styled theme - typescript 적용

declare module 'styled-components' {
  // DefaultTheme에 대한 interface를 적어두면 DefaultTheme사용시 type정책 사용가능
  export interface DefaultTheme {
    fontColor?: '#2c2c2c' | 'lightgray' | 'white';
    bgColor?: '#2c2c2c' | 'lightgray' | 'white';
    accent?: '#0095f6';
    borderColor?: 'rgb(219, 219, 219)';
  }
}
