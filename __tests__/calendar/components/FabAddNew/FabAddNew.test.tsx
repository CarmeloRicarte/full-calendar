import { describe, test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FabAddNew } from "../../../../src/calendar/components/FabAddNew/FabAddNew";
import * as useCalendarStore from "../../../../src/hooks/useCalendarStore";
import * as useUiStore from "../../../../src/hooks/useUiStore";

vi.mock("../../../../src/hooks/useCalendarStore");
vi.mock("../../../../src/hooks/useUiStore");

describe("Tests of <FabAddNew />", () => {
  const mockSetActiveEvent = vi.fn();
  const mockOpenDateModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render button", () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      setActiveEvent: mockSetActiveEvent,
    });

    (useUiStore as any).useUiStore = vi.fn().mockReturnValue({
      openDateModal: mockOpenDateModal,
    });
    const { container } = render(<FabAddNew />);
    expect(container).toMatchSnapshot();
  });

  test("should call setActiveEvent and openDateModal on click", () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      setActiveEvent: mockSetActiveEvent,
    });

    (useUiStore as any).useUiStore = vi.fn().mockReturnValue({
      openDateModal: mockOpenDateModal,
    });
    render(<FabAddNew />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetActiveEvent).toHaveBeenCalledWith({
      title: "",
      notes: "",
      start: expect.any(Date),
      end: expect.any(Date),
    });
    expect(mockOpenDateModal).toHaveBeenCalled();
  });
});
