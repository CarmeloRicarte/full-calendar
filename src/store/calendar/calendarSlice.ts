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
    onAddNewEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      const eventToUpdate = state.events.find(
        (event) => event._id === payload._id
      );
      if (eventToUpdate) {
        Object.assign(eventToUpdate, payload);
      }
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => {
          event._id !== state.activeEvent?._id;
        });
        state.activeEvent = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
