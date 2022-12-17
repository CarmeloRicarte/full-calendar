import { parseISO } from "date-fns";
import { CalendarEvent, CalendarEventFromDB } from "../calendar/interfaces";

export const convertEventsToDateEvents = (
  events: CalendarEventFromDB[]
): CalendarEvent[] => {
  const eventsMapped = events.map((event) => {
    return {
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end),
    };
  });
  return eventsMapped;
};
