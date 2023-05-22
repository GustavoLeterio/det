import { useReducer } from "react";
import { Action } from "redux";
import { Order } from "../Order/IOrder";
import { mockup } from "../../../Mocks/pedidos";

export const myOrders: Order[] = mockup;

const inicialState: [Order[]] = [myOrders];
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const getItemsFromAPI = () => {};

  return [state, getItemsFromAPI];
};
