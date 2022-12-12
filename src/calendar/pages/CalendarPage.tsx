import { Calendar, Event, View } from "react-big-calendar";
import { addHours } from "date-fns";
import "./CalendarPage.scss";
import { CalendarEvent, Navbar } from "../";
import { localizer, getCalendarMessagesES } from "../../helpers";
import { useState } from "react";

const myEventsList = [
  {
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
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState<View>(
    localStorage.getItem("lastView")
      ? (localStorage.getItem("lastView") as View)
      : "week"
  );

  const eventStyleGetter = (
    event: Event,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  };

  const onDoubleClick = (event: any) => {
    console.log(event);
  };

  const onSelect = (event: any) => {
    console.log(event);
  };

  const onViewChanged = (event: any) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={myEventsList}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getCalendarMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
    </>
  );
};
