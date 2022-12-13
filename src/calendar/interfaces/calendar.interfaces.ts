import { Event } from "react-big-calendar";
export interface CalendarEvent extends Event {
  _id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
}
