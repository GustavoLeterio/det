import { slice as loginSlice } from "./slice";

export const {
  changeLoginState,
  changeLoginEmail,
  changeLoginPassword,
  changeLoginRepeatedPassword,
  toggleRememberMe,
  setToken
} = loginSlice.actions;
