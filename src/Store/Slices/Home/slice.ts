import { createSlice } from "@reduxjs/toolkit";
import { home } from "./useHome";

export const slice = createSlice({
  name: "home",
  initialState: home,
  reducers: {
    changeNutrient(state,value){
      return {...state, nutrient:value.payload}
    },
    changeListOfItems(state,value){
      return {...state, items:value.payload}
    },
  },
});
