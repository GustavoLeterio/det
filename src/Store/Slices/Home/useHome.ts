import { useReducer } from "react";
import { Action } from "redux";
import { Home } from "./IHome";
import { Nutrients } from "../../../Utils/Nutrients.enum";

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
