import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CalendarEvent } from "../../calendar/interfaces";
import { addHours } from "date-fns";

export interface CalendarState {
  isLoadingEvents: boolean;
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  events: [],
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
        (event) => event.id === payload.id
      );
      if (eventToUpdate) {
        Object.assign(eventToUpdate, payload);
      }
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => {
          event.id !== state.activeEvent?.id;
        });
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<CalendarEvent[]>) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarSlice.actions;
