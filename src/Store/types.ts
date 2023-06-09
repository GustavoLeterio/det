import {
  Action,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  ThunkAction,
} from "@reduxjs/toolkit";
import { store } from ".";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type Dispatcher = {
  dispatch: AppDispatch;
  actionWithoutPayload?:
    | ActionCreatorWithoutPayload<any>
    | ActionCreatorWithoutPayload<any>[];
  actionWithPayload?:
    | ActionCreatorWithPayload<any, any>
    | ActionCreatorWithPayload<any, any>[];
};
