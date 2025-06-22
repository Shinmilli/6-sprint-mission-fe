// src/styles/styled.d.ts

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: string[];
      white: string;
      black: string;
      gray: string[];
      red: string[];
    };
    mediaQuery: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
