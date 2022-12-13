import { Event } from "react-big-calendar";
export interface CalendarEvent extends Event {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  _id?: string;
  bgColor?: string;
  user?: {
    _id: string;
    name: string;
  };
}
