import { useReducer } from "react";
import { Action } from "redux";
import { Order } from "./IOrder";

export const order: Order = {
  items: [],
  date: "",
};

const inicialState: [Order] = [order];
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const changeListOfItems = () => { };
  const changeItemWeight = () => { };
  const setAdress = () => { };

  return [state, changeListOfItems, changeItemWeight, setAdress];
};
