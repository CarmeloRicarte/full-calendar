import { Event } from "react-big-calendar";
export interface ICalendarEvent extends Event {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  id?: string;
  bgColor?: string;
  user?: {
    _id: string;
    name: string;
  };
}

export interface ICalendarEventFromDB {
  title: string;
  notes: string;
  start: string;
  end: string;
  id: string;
  bgColor?: string;
  user?: {
    _id: string;
    name: string;
  };
}
