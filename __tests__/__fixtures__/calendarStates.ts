import { ICalendarEvent } from "../../src/calendar/interfaces";
export const events: ICalendarEvent[] = [
  {
    id: "1",
    start: new Date("2022-12-19 13:00:00"),
    end: new Date("2022-12-19 15:00:00"),
    title: "Event 1",
    notes: "Some note",
  },
  {
    id: "2",
    start: new Date("2022-12-18 13:00:00"),
    end: new Date("2022-12-18 15:00:00"),
    title: "Event 2",
    notes: "Some note of event 2",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
