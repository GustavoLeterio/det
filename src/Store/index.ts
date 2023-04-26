import { configureStore } from "@reduxjs/toolkit";
import { slice as themeSlice } from "./Slices/Themes/slice";
import { slice as loginSlice } from "./Slices/Login/slice";
import { slice as homeSlice } from "./Slices/Home/slice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    login: loginSlice.reducer,
    home: homeSlice.reducer,
  },
});
