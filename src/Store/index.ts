import { configureStore } from "@reduxjs/toolkit";
import { slice as themeSlice } from "./Slices/Themes/slice";
import { slice as loginSlice } from "./Slices/Login/slice";
import { slice as homeSlice } from "./Slices/Home/slice";
import { slice as orderSlice } from "./Slices/Order/slice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    login: loginSlice.reducer,
    home: homeSlice.reducer,
    order: orderSlice.reducer,
  },
});
