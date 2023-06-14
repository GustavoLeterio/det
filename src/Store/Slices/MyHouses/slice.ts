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
      const house = { ...payload.payload, id: (state.houses.length+1) }
      state.houses = [...state.houses, house];
      if (state.houses.length == 1) state.houses[0].isPrimary = true;
      return state;
    },
    changeHouse(state, payload: { payload: House }) {
      state.houses[state.houses.findIndex((house: House) => {
        return house.id == payload.payload.id
      })] = payload.payload;
      axios.post(baseURL + `/api/v1/create/address`, payload)

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
      state.houses = state.houses.filter((house, i) => i != payload.payload)
      return state;
    },
    handleAccordions(state, payload: { payload: number }) {
      state.opennedAccordionPos = payload.payload;
      return state;
    }
  },
});