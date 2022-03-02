import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import * as _ from "lodash";

export type AlarmStatus = 'alarm' | 'all-clear' | 'undefined';
export interface AlarmStatusUpdate {
  status: AlarmStatus;
  title: string;
  text: string;
  lastUpdated: number;
}

export interface AlarmStatusState {
  status: AlarmStatus;
  title: string;
  text: string;
  lastUpdated: number;
  alarmSoundPlaying: boolean;
  pendingStatusUpdate: boolean;
}

const initialState: AlarmStatusState = {
  status: "undefined",
  title: "Немає інформації",
  text: "Дочекайтеся наступного оновлення статусу",
  lastUpdated: Date.now(),
  alarmSoundPlaying: false,
  pendingStatusUpdate: false
};

export const AlarmStatusSlice = createSlice({
  name: "alarmStatus",
  initialState: initialState,
  reducers: {
    startUpdate: state => {
      state.pendingStatusUpdate = true;
      return state;
    },
    doUpdate: (state, action: PayloadAction<AlarmStatusUpdate>) => {
      const payload = action.payload;
      state.pendingStatusUpdate = false;
      if (payload.lastUpdated > state.lastUpdated) {
        state.status = payload.status;
        state.title = payload.title;
        state.text = payload.text;
        state.lastUpdated = payload.lastUpdated;
        state.alarmSoundPlaying =
          state.status === "alarm" || state.status === "undefined";
      }
      return state;
    },
    mute: state => {
      state.alarmSoundPlaying = false;
    }
  }
});

export const { startUpdate, doUpdate, mute } = AlarmStatusSlice.actions;

export const selectStatusCardData = (state: RootState) => {
  return _.omit(state.alarmStatus, [
    "alarmSoundPlaying",
    "pendingStatusUpdate"
  ]);
};

export const selectSoundPlaybackStatus = (state: RootState) =>
  state.alarmStatus.alarmSoundPlaying;

export const selectDataUpdatingStatus = (state: RootState) =>
  state.alarmStatus.pendingStatusUpdate;

export default AlarmStatusSlice.reducer;
