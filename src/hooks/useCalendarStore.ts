import { useAppDispatch } from "./dispatchSelector";
import { useSelector } from "react-redux";
import {
  onAddNewEvent,
  onUpdateEvent,
  onSetActiveEvent,
  RootState,
  onDeleteEvent,
  onLoadEvents,
} from "../store";
import { CalendarEvent } from "../calendar/interfaces";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    //TODO: LLEGAR AL BACKEND

    if (calendarEvent.id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creating
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user: {
            name: user.name,
            _id: user.uid,
          },
          bgColor: "#fafafa",
        })
      );
    }
  };

  const startDeletingEvent = async () => {
    //TODO: LLEGAR AL BACKEND
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent && activeEvent.id,
    //*Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
