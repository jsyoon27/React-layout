import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: "light" | "dark";
    color: {
      primary: string;
      background: string;
      secondary: string;
      third: string;
    };
  }
}