import { slice as orderSlice } from "./slice";

export const {
  changeListOfItems,
  changeItemWeight,
  setAdress,
  resetOrder
} = orderSlice.actions;
