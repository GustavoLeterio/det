import { useReducer } from "react";
import { Action } from "redux";
import { mockup } from "../../../Mocks/house";
import { MyHouses } from "./IMyHouses";

export const myHouses: MyHouses = {
  houses: mockup,
  opennedAccordionPos: -2,
};

const inicialState: MyHouses = myHouses;
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const getHouses = () => { };
  const addHouse = () => { };
  const changePrimaryHouse = () => { };
  const changeHouse = () => { };
  const handleAccordions = () => { };
  const deleteHouse = () => { };

  return [state, getHouses, addHouse, changePrimaryHouse, changeHouse, handleAccordions, deleteHouse];
};
