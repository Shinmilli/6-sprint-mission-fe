import type { DefaultTheme } from "styled-components";
const colors = {
  blue: ["#3692FF", "#1967D6", "#1251AA"],
  white: "#FFF",
  black: "#1F2937",
  gray: ["#9CA3AF", "#F3F4F6", "#F9FAFB"],
  red: ["#F74747"],
};

const mediaQuery = {
  mobile: "screen and (max-width: 768px)",
  tablet: "screen and (max-width: 1280px)",
  desktop: "screen and (min-width: 1281px)",
};

const theme: DefaultTheme = {
  colors,
  mediaQuery,
};

export default theme;
