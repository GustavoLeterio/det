import { createSlice } from "@reduxjs/toolkit";
import { accordion } from "./useAccordion";
import { valueToKey } from "../../../Utils/Nutrients.enum";

export const slice = createSlice({
  name: "home",
  initialState: accordion,
  reducers: {
    toggleAccordion(state, value) {
      const objKey = valueToKey(value.payload);
      //@ts-ignore
      state[objKey] = !state[objKey];
      return state;
    },
    openAccordion(state, value) {
      const objKey = valueToKey(value.payload);
      //@ts-ignore
      state[objKey] = true;
      return state;
    },
  },
});
