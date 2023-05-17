import { useReducer } from "react";
import { Action } from "redux";
import { Home, Nutrients } from "./IHome";

export const home: Home = {
  nutrient: Nutrients.protein
};

const inicialState: [Home] = [home];
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const changeNutrient = () => {};

  return [state, changeNutrient];
};
