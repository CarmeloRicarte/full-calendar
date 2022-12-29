import { describe, test, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { CalendarEvent } from "../../../../src/calendar/components/CalendarEvent/CalendarEvent";
import { DateLocalizer } from "react-big-calendar";

describe("Tests of <CalendarEvent />", () => {
  test("should render the component", async () => {
    const props = {
      event: {
        title: "Cumpleaños",
        user: { name: "Carmelo" },
      },
      title: "Cumpleaños",
      continuesPrior: false,
      continuesAfter: false,
      isAllDay: false,
      localizer: {} as DateLocalizer,
      slotStart: new Date("23-12-2022"),
      slotEnd: new Date("24-12-2022"),
    };
    render(<CalendarEvent {...props} />);
    expect(screen.getByText("Cumpleaños")).toBeTruthy();
    expect(screen.getByTestId("username-nav").textContent).toContain("Carmelo");
  });
});
