import { EventProps } from "react-big-calendar";

export const CalendarEvent = ({ event }: EventProps<any>) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <span data-testid="username-nav"> - {user?.name}</span>
    </>
  );
};
