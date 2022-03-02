import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import alarmStatusReducer from "./AlarmStatusSlice";

export const store = configureStore({
  reducer: {
    alarmStatus: alarmStatusReducer
  }
});

export const dispatch = store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;