import { useReducer } from "react";
import { Action } from "redux";

export const login: Login = {
  isLogin: true,
  form: {
    email: "",
    password: "",
    repeatedPassword: "",
    rememberMe: false,
    userName: "Usuário"
  },
  token: null,
  userId: ""
};

const inicialState: [Login] = [login];
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const changeLoginState = () => { };
  const changeLoginValueByKey = () => { };
  const setToken = () => { };

  return [state, changeLoginState, changeLoginValueByKey, setToken];
};
