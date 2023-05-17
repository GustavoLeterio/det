import { createSlice } from "@reduxjs/toolkit";
import { home } from "./useHome";

export const slice = createSlice({
  name: "home",
  initialState: home,
  reducers: {
    changeNutrient(state,value){
      return {...state, nutrient:value.payload}
    }
  },
});
