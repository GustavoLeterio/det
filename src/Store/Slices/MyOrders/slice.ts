import { createSlice } from "@reduxjs/toolkit";
import { myOrders } from "./useMyOrders";

export const slice = createSlice({
  name: "myOrders",
  initialState: myOrders,
  reducers: {
    getItemsFromAPI(state) {
      return state;
    },
  },
});
