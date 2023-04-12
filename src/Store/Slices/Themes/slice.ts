import { createSlice } from "@reduxjs/toolkit";
import { themes } from "./useTheme";

export const slice = createSlice({
  name: "theme",
  initialState: themes.light,
  reducers: {
    changeTheme(state) {
      return (state = state.name == "light" ? themes.dark : themes.light);
    },
  },
});
