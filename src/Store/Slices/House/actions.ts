import { slice as houseSlice } from "./slice";

export const {
    setHouseID,
    changeName,
    changeState,
    changeCity,
    changeGarden,
    changeStreet,
    changeNumber,
    changeCep,
    changeTempo,
} = houseSlice.actions;
