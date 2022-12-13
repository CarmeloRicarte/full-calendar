import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );

  return {
    //* Properties
    events,
    activeEvent,
    //*Methods
  };
};
