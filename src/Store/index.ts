import { configureStore } from "@reduxjs/toolkit";
import { slice as themeSlice } from "./Slices/Themes/slice";
import { slice as loginSlice } from "./Slices/Login/slice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    login: loginSlice.reducer,
  },
});
