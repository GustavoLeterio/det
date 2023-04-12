import { createSlice } from "@reduxjs/toolkit";
import { login } from "./useLogin";

export const slice = createSlice({
  name: "login",
  initialState: login,
  reducers: {
    changeLoginState(state, value) {
      return { ...state, isLogin: value.payload };
    },

    changeLoginValueByKey(state, value) {
      //value {key,value}
      if (value.payload.key == "email") {
        let newState = { ...state };
        newState.form = { ...state.form, email: value.payload.value };
        return newState;
      }
      if (value.payload.key == "password") {
        let newState = { ...state };
        newState.form = { ...state.form, password: value.payload.value };
        return newState;
      }
      if (value.payload.key == "repeatedPassword") {
        let newState = { ...state };
        newState.form = {
          ...state.form,
          repeatedPassword: value.payload.value,
        };
        return newState;
      }
      if (value.payload.key == "rememberMe") {
        let newState = { ...state };
        newState.form = { ...state.form, rememberMe: value.payload.value };
        return newState;
      }
    },
  },
});
