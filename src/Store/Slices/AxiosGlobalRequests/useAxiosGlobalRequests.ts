import { useReducer } from "react";
import { Action } from "redux";
import { AxiosGlobalRequests } from "./IAxiosGlobalRequests";

export const axiosGlobalRequests: AxiosGlobalRequests = {
  states: [],
  cities: [],
};

const inicialState: [AxiosGlobalRequests] = [axiosGlobalRequests];
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const setStates = () => { };
  const setCities = () => { };

  return [state, setStates, setCities];
};
