import { useReducer } from "react";
import { Action } from "redux";
import { AccordionsOpened} from "./IAccordion";

export const accordion: AccordionsOpened = {
  protein: false,
  fat: false,
  fiber: false,
  carbohidrate: false,
};

const inicialState: [AccordionsOpened] = [accordion];
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const toggleAccordion = () => {};
  const openAccordion = () => {};

  return [state,toggleAccordion,openAccordion];
};
