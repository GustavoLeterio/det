import { createSlice } from "@reduxjs/toolkit";
import { login } from "./useLogin";

export const slice = createSlice({
  name: "login",
  initialState: login,
  reducers: {
    resetState() {
      return login;
    },
    changeUserName(state, value) {
      return {
        ...state,
        form: {
          ...state.form,
          userName: value.payload,
        },
      };
    },
    changeLoginState(state, value) {
      return { ...state, isLogin: value.payload, form: { ...state.form, email: "", password: "" } };
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
    setUserId(state, value) {
      return {
        ...state,
        userId: value.payload,
      };
    },
    removeToken(state) {
      return { ...state, token: null };
    },
    toggleRememberMe(state,paylaod) {
      return {
        ...state,
        form: {
          ...state.form,
          rememberMe:paylaod.payload,
        },
      };
    },
  },
});
