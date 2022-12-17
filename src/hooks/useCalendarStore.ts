import { useAppDispatch } from "./dispatchSelector";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  onAddNewEvent,
  onUpdateEvent,
  onSetActiveEvent,
  RootState,
  onDeleteEvent,
  onLoadEvents,
} from "../store";
import { ICalendarEvent } from "../calendar/interfaces";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const setActiveEvent = (calendarEvent: ICalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: ICalendarEvent) => {
    try {
      if (calendarEvent.id) {
        // updating
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        dispatch(
          onUpdateEvent({
            ...calendarEvent,
            user: {
              name: user.name,
              _id: user.uid,
            },
          })
        );
        return;
      }
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
    } catch (error: any) {
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent?.id}`);
      dispatch(onDeleteEvent());
    } catch (error: any) {
      Swal.fire("Error al borrar", error.response.data?.msg, "error");
    }
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
