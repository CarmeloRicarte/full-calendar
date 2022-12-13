import { useAppDispatch } from "./dispatchSelector";
import { useSelector } from "react-redux";
import { onSetActiveEvent, RootState } from "../store";
import { CalendarEvent } from "../calendar/interfaces";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  return {
    //* Properties
    events,
    activeEvent,
    //*Methods
    setActiveEvent,
  };
};
