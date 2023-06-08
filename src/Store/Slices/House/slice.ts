import { createSlice } from "@reduxjs/toolkit";
import { house } from "./useHouse";


export const slice = createSlice({
  name: "house",
  initialState: house,
  reducers: {
    changeName(state, payload) {
      state.name = payload.payload
      return state;
    },
    changeState(state, payload) {
      state.state = payload.payload
      return state;
    },
    changeCity(state, payload) {
      state.city = payload.payload
      return state;
    },
    changeGarden(state, payload) {
      state.garden = payload.payload
      return state;
    },
    changeStreet(state, payload) {
      state.street = payload.payload
      return state;
    },
    changeNumber(state, payload) {
      state.number = payload.payload
      return state;
    },
    changeCep(state, payload) {
      state.cep = payload.payload
      return state;
    },
    changeTempo(state, payload) {
      return payload.payload;
    }
  },
});