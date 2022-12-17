import { parseISO } from "date-fns";
import { ICalendarEvent, ICalendarEventFromDB } from "../calendar/interfaces";

export const convertEventsToDateEvents = (
  events: ICalendarEventFromDB[]
): ICalendarEvent[] => {
  const eventsMapped = events.map((event) => {
    return {
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end),
    };
  });
  return eventsMapped;
};
