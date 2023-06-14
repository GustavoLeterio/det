import { createSlice } from "@reduxjs/toolkit";
import { myOrders } from "./useMyOrders";
import { Nutrients } from "../../../Utils/Nutrients.enum";

export const slice = createSlice({
  name: "myOrders",
  initialState: myOrders,
  reducers: {
    getItemsFromAPI(state) {
      return state;
    },
    newOrder(state, paylaod) {
      console.log(paylaod.payload)
      const temp = [...state, paylaod.payload]
      console.log(paylaod.payload)
      return temp;
    }
  }
});
