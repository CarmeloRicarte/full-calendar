import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICalendarEvent } from "../../calendar/interfaces";
import { addHours } from "date-fns";

export interface CalendarState {
  isLoadingEvents: boolean;
  events: ICalendarEvent[];
  activeEvent: ICalendarEvent | null;
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
    onSetActiveEvent: (state, { payload }: PayloadAction<ICalendarEvent>) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<ICalendarEvent>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<ICalendarEvent>) => {
      const eventToUpdate = state.events.find(
        (event) => event.id === payload.id
      );
      if (eventToUpdate) {
        Object.assign(eventToUpdate, payload);
      }
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        const eventFound = state.events.find(
          (storeEvent) => storeEvent.id === state.activeEvent?.id
        );
        if (eventFound) {
          state.events.splice(state.events.indexOf(eventFound), 1);
          state.activeEvent = null;
        }
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<ICalendarEvent[]>) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
      state.activeEvent = null;
    },
    onLogoutCalendar: (state) => {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true;
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
  onLogoutCalendar,
} = calendarSlice.actions;
