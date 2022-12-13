import { useAppDispatch } from "./dispatchSelector";
import { useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, RootState } from "../store";
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
    } else {
      // creating
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime().toString(),
        })
      );
    }
  };

  return {
    //* Properties
    events,
    activeEvent,
    //*Methods
    setActiveEvent,
    startSavingEvent,
  };
};
