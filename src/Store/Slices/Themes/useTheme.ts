import { useReducer } from "react";
import { Action } from "redux";
import { Effects, Fonts, ThemeModel } from "./IThemes";

const fonts: Fonts = { regular: 400, medium: 500, bold: 700, black: 900 };
const effects: Effects = {};

export const themes: { light: ThemeModel; dark: ThemeModel } = {
  dark: {
    name: "dark",
    color: {
      primary: "#0BD618",
      secondary: "#1B9624",
      white: "#000000",
      offWhite: "#F9F9F9",
      fontGray: "#7C7C7C",
      black: "#000000",
      fontColor: "#222328",
      lightGray: "#E6E6E6",
      writedInput: "#7C7C7C",
      fieldset: "#7C7C7C",
      error: "#E10C0C",
    },
    fonts,
  },
  light: {
    name: "light",
    color: {
      primary: "#0BD618",
      secondary: "#1B9624",
      white: "#FFFFFF",
      offWhite: "#F9F9F9",
      fontGray: "#7C7C7C",
      black: "#000000",
      fontColor: "#222328",
      lightGray: "#E6E6E6",
      writedInput: "#7C7C7C",
      fieldset: "#7C7C7C",
      error: "#E10C0C",
    },
    fonts,
  },
};

const inicialState: [ThemeModel] = [themes.light];
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return [state === themes.light ? themes.dark : themes.light];
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const changeTheme = () => {};

  return [state, changeTheme];
};
