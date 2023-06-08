import { slice as houseSlice } from "./slice";

export const {
    changeName,
    changeState,
    changeCity,
    changeGarden,
    changeStreet,
    changeNumber,
    changeCep,
    changeTempo,
} = houseSlice.actions;
