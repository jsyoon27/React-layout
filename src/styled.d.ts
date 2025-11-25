import "styled-components";
import { light } from "./style/theme"; // 경로 수정: ./theme -> ./style/theme

type Theme = typeof light;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}