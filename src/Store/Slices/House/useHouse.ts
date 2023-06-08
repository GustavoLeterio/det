import { useReducer } from "react";
import { Action } from "redux";
import { mockup } from "../../../Mocks/house";

export const house: House = {
  name: "",
  state: "",
  city: "",
  garden: "",
  street: "",
  number: null,
  cep: "",
  isPrimary: false,
}

const inicialState: House = house;
const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, inicialState);
  const changeName = () => { };
  const changeState = () => { };
  const changeCity = () => { };
  const changeGarden = () => { };
  const changeStreet = () => { };
  const changeNumber = () => { };
  const changeCep = () => { };
  const changeTempo = () => { };

  return [state,
    changeName,
    changeState,
    changeCity,
    changeGarden,
    changeStreet,
    changeNumber,
    changeCep,
    changeTempo,
  ];
};
