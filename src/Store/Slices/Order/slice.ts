import { createSlice } from "@reduxjs/toolkit";
import { order } from "./useOrder";

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
  },
});
