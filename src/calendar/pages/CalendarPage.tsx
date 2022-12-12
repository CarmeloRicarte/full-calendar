import { Calendar, Event } from "react-big-calendar";
import { addHours } from "date-fns";
import "./CalendarPage.scss";
import { Navbar } from "../";
import { localizer, getCalendarMessagesES } from "../../helpers";

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

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getCalendarMessagesES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
