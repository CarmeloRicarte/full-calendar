import { describe, test, expect } from "vitest";

import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
} from "./../../__fixtures__/calendarStates";
import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "./../../../src/store/calendar/calendarSlice";
import { initialState } from "../../__fixtures__/calendarStates";

describe("Tests of  calendarSlice", () => {
  test("should return initial state", () => {
    expect(calendarSlice.getInitialState()).toEqual(initialState);
  });

  test("onSetActiveEvent should set active event", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent should add the event", () => {
    const newEvent = {
      id: "3",
      start: new Date("2022-12-20 13:00:00"),
      end: new Date("2022-12-20 15:00:00"),
      title: "Event 3",
      notes: "Some note of event 3",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent should update the event", () => {
    const eventForUpdate = {
      id: "1",
      start: new Date("2022-12-20 13:00:00"),
      end: new Date("2022-12-20 15:00:00"),
      title: "Event 1 Updated",
      notes: "Some note of event 1 updated",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(eventForUpdate)
    );
    expect(state.events[0]).toEqual(eventForUpdate);
  });

  test("onDeleteEvent should deletec the active event", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents should load events in store", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);
  });

  test("onLogoutCalendar should clear calendar store", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
