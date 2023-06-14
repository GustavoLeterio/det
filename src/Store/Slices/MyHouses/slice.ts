import { createSlice } from "@reduxjs/toolkit";
import { myHouses } from "./useMyHouses";
import axios from "axios";
import { baseURL } from "../../../Utils";

export const slice = createSlice({
  name: "myHouses",
  initialState: myHouses,
  reducers: {
    setHouses(state, payload: { payload: House[] }) {
      state.houses = payload.payload;
      return state
    },
    addHouse(state, payload: { payload: House }) {
      state.houses = [...state.houses, payload.payload];
      if (state.houses.length == 1) state.houses[0].isPrimary = true;
      axios.put(baseURL + `/api/v1/address/` , payload)
      return state;
    },
    changeHouse(state, payload: { payload: House }) {
      state.houses[state.houses.findIndex((house: House) => {
        return house.id == payload.payload.id
      })] = payload.payload;
      axios.post(baseURL + `/api/v1/create/address` , payload)

      return state;
    },
    changePrimaryHouse(state, payload: { payload: House }) {
      state.houses.forEach((house: House) => {
        if (house.id != payload.payload.id)
          house.isPrimary = false;
        else
          house.isPrimary = true;
      })
      return state;
    },
    deleteHouse(state, payload: { payload: number }) {
      axios.delete(baseURL + `/api/v1/address/${state.houses[payload.payload].id}`)
      .then(() => {
        state.houses = state.houses.filter((house, i) => i != payload.payload)
        return state;})
      .catch((err) => {console.log(err)})
    },
    handleAccordions(state, payload: { payload: number }) {
      state.opennedAccordionPos = payload.payload;
      return state;
    }
  },
});