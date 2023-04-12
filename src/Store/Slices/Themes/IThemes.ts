export interface ThemeModel {
  name: string;
  color: Color;
  effect?: Effects;
  fonts: Fonts;
}

export interface Fonts {
  regular: number;
  medium: number;
  bold: number;
  black: number;
}

export interface Color {
  primary: string;
  white: string;
  offWhite: string;
  fontGray: string;
  black: string;
  fontColor: string;
  lightGray: string;
  writedInput: string;
  fieldset: string;
}
export interface Effects {}
