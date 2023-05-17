import { createSlice } from "@reduxjs/toolkit";
import { login } from "./useLogin";

export const slice = createSlice({
  name: "login",
  initialState: login,
  reducers: {
    changeLoginState(state, value) {
      return { ...state, isLogin: value.payload };
    },
    changeLoginEmail(state, value) {
      return {
        ...state,
        form: {
          ...state.form,
          email: value.payload,
        },
      };
    },
    changeLoginPassword(state, value) {
      return {
        ...state,
        form: {
          ...state.form,
          password: value.payload,
        },
      };
    },
    changeLoginRepeatedPassword(state, value) {
      return {
        ...state,
        form: {
          ...state.form,
          repeatedPassword: value.payload,
        },
      };
    },
    setToken(state, value) {
      return {
        ...state,
        token: value.payload,
      };
    },
    removeToken(state) {
      return { ...state, token: null };
    },
    toggleRememberMe(state) {
      return {
        ...state,
        form: {
          ...state.form,
          rememberMe: !state.form.rememberMe,
        },
      };
    },
  },
});
