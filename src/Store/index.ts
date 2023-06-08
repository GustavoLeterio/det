import { configureStore } from "@reduxjs/toolkit";
import { slice as themeSlice } from "./Slices/Themes/slice";
import { slice as loginSlice } from "./Slices/Login/slice";
import { slice as homeSlice } from "./Slices/Home/slice";
import { slice as orderSlice } from "./Slices/Order/slice";
import { slice as house } from "./Slices/House/slice";
import { slice as myHousesSlice } from "./Slices/MyHouses/slice";
import { slice as myOrdersSlice } from "./Slices/MyOrders/slice";
import { slice as accordionSlice } from "./Slices/Accordion/slice";
import { slice as axiosGlobalRequestsSlice } from "./Slices/AxiosGlobalRequests/slice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    login: loginSlice.reducer,
    home: homeSlice.reducer,
    order: orderSlice.reducer,
    myOrders: myOrdersSlice.reducer,
    house: house.reducer,
    myHouses: myHousesSlice.reducer,
    accordion: accordionSlice.reducer,
    axiosGlobalRequests: axiosGlobalRequestsSlice.reducer,
  },
});
