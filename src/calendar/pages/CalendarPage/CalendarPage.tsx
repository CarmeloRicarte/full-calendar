import { useEffect, useState } from "react";
import { Calendar, View } from "react-big-calendar";
import "./CalendarPage.scss";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../..";
import { localizer, getCalendarMessagesES } from "../../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../../hooks";
import { ICalendarEvent } from "../../interfaces";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState<View>(
    localStorage.getItem("lastView")
      ? (localStorage.getItem("lastView") as View)
      : "week"
  );

  const eventStyleGetter = (event: ICalendarEvent) => {
    const isMyEvent = user.uid === event.user?._id;
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "rgba(247,133,5,1)",
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

  useEffect(() => {
    startLoadingEvents();
  }, []);

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
      <FabAddNew />
      <FabDelete />
    </>
  );
};
