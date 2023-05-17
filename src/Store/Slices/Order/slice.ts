import { createSlice } from "@reduxjs/toolkit";
import { order } from "./useOrder";
import { Nutrients } from "../Home/IHome";
import { valueToKey } from "../../../Utils/Nutrients.enum";

export const slice = createSlice({
  name: "order",
  initialState: order,
  reducers: {
    changeListOfItems(state, value) {
      return { ...state, items: value.payload };
    },
    changeItemWeight(state, value) {
      const pos = state.items.map((i) => i.item.id).indexOf(value.payload.id);
      state.items[pos].weight = value.payload.value;
      return state;
    },
    toggleAccordion(state, value) {
      const objKey = valueToKey(value.payload);
      //@ts-ignore
      state.openedAccordion[objKey] = !state.openedAccordion[objKey];
      return state;
    },
    openAccordion(state, value) {
      const objKey = valueToKey(value.payload);
      //@ts-ignore
      state.openedAccordion[objKey] = true;
      return state;
    },
  },
});
