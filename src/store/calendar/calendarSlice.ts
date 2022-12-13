import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CalendarEvent } from "../../calendar/interfaces";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime().toString(),
  title: "Cumpleaños",
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Carmelo",
  },
};

export interface CalendarState {
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
}

const initialState: CalendarState = {
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.activeEvent = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;
