import { slice as loginSlice } from "./slice";

export const {
  changeLoginState,
  changeLoginEmail,
  changeLoginPassword,
  changeLoginRepeatedPassword,
  resetState,
  changeUserName,
  toggleRememberMe,
  setToken,
  setUserId
} = loginSlice.actions;
