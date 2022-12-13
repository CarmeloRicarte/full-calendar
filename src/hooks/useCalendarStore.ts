import { useAppDispatch } from "./dispatchSelector";
import { useSelector } from "react-redux";
import {
  onAddNewEvent,
  onUpdateEvent,
  onSetActiveEvent,
  RootState,
  onDeleteEvent,
} from "../store";
import { CalendarEvent } from "../calendar/interfaces";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    //TODO: LLEGAR AL BACKEND

    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creating
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime().toString(),
          bgColor: "#fafafa",
        })
      );
    }
  };

  const startDeletingEvent = async () => {
    //TODO: LLEGAR AL BACKEND
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent && activeEvent._id,
    //*Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
