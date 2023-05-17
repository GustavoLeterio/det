import { useReducer } from "react";
import { Action } from "redux";
import { Order } from "./IOrder";

export const order: Order = {
  items: [],
  openedAccordion: {
    carbohidrate: false,
    protein: false,
    fat: false,
    fiber: false,
  },
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
  const changeListOfItems = () => {};
  const changeItemWeight = () => {};
  const toggleAccordion = () => {};
  const openAccordion = () => {};

  return [state, changeListOfItems, changeItemWeight,toggleAccordion,openAccordion];
};
