import { createSlice } from "@reduxjs/toolkit";
import { axiosGlobalRequests } from "./useAxiosGlobalRequests";

export const slice = createSlice({
  name: "axiosGlobalRequests",
  initialState: axiosGlobalRequests,
  reducers: {
    setStates(state, payload) {
      state.states = payload.payload;
      return state;
    },
    setCities(state, payload) {
      state.cities = payload.payload;
      return state;
    },
  },
});
