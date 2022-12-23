import { describe, test, expect } from "vitest";
import { getCalendarMessagesES } from "../../src/helpers";

describe("Tests of getCalendarMessagesES", () => {
  test("should return an object with messages", () => {
    const calendarMessages = getCalendarMessagesES();
    expect(calendarMessages).toEqual({
      allDay: expect.any(String),
      previous: expect.any(String),
      next: expect.any(String),
      today: expect.any(String),
      month: expect.any(String),
      week: expect.any(String),
      day: expect.any(String),
      agenda: expect.any(String),
      date: expect.any(String),
      time: expect.any(String),
      event: expect.any(String),
      noEventsInRange: expect.any(String),
      showMore: expect.any(Function),
    });
  });
});
