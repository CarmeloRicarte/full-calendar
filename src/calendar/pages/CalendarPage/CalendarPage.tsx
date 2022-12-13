import { Calendar, Event, View } from "react-big-calendar";
import { addHours } from "date-fns";
import "./CalendarPage.scss";
import { CalendarEvent, CalendarModal, Navbar } from "../..";
import { localizer, getCalendarMessagesES } from "../../../helpers";
import { useState } from "react";
import { useCalendarStore, useUiStore } from "../../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
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

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event: any) => {
    setActiveEvent(event);
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
        events={events}
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
      <CalendarModal />
    </>
  );
};
