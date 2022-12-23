import { describe, test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../../src/calendar/components/FabDelete/FabDelete";
import * as useCalendarStore from "../../../../src/hooks/useCalendarStore";

vi.mock("../../../../src/hooks/useCalendarStore");

describe("Tests of <FabDelete />", () => {
  const mockStartDeletingEvent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should render correctly", () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDelete />);
    const btn = screen.getByTestId("fab-delete");

    expect(btn.classList.contains("btn")).toBeTruthy();
    expect(btn.classList.contains("btn-danger")).toBeTruthy();
    expect(btn.classList.contains("fab-danger")).toBeTruthy();
    expect(btn.style.display).toBe("none");
  });

  test("should show the button if there is and event active", () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDelete />);
    const btn = screen.getByTestId("fab-delete");
    expect(btn.style).not.toContain({ display: "none" });
  });

  test("should call to startDeletingEvent when click on button", () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });
    render(<FabDelete />);
    const btn = screen.getByTestId("fab-delete");
    fireEvent.click(btn);
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
