import { describe, test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import * as useCalendarStore from "../../../../src/hooks/useCalendarStore";
import * as useUiStore from "../../../../src/hooks/useUiStore";
import { CalendarModal } from "../../../../src/calendar/components/CalendarModal/CalendarModal";
import { events } from "../../../__fixtures__/calendarStates";

vi.mock("../../../../src/hooks/useCalendarStore");
vi.mock("../../../../src/hooks/useUiStore");

describe("Tests of <CalendarModal />", () => {
  const mockStartSavingEvent = vi.fn();
  const mockCloseDateModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render the modal", () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      activeEvent: null,
    });
    (useUiStore as any).useUiStore = vi.fn().mockReturnValue({
      isDateModalOpen: true,
    });

    const { container } = render(<CalendarModal />);
    expect(container).toMatchSnapshot();
  });

  test("should render the modal with the active event", () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      activeEvent: events[0],
    });
    (useUiStore as any).useUiStore = vi.fn().mockReturnValue({
      isDateModalOpen: true,
    });
    render(<CalendarModal />);
    const startDateInput = screen.getByDisplayValue("19/12/2022, 13:00");
    const endDateInput = screen.getByDisplayValue("19/12/2022, 15:00");
    const titleInput = screen.getByDisplayValue("Event 1");
    const notesInput = screen.getByDisplayValue("Some note");

    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Editar evento"
    );
    expect({
      startDateInput,
      endDateInput,
      titleInput,
      notesInput,
    }).toBeTruthy();
  });

  test("should submit data correctly", async () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      activeEvent: events[0],
      startSavingEvent: mockStartSavingEvent,
    });
    (useUiStore as any).useUiStore = vi.fn().mockReturnValue({
      isDateModalOpen: true,
      closeDateModal: mockCloseDateModal,
    });
    render(<CalendarModal />);
    const saveButton = screen.getByRole("button", { name: "Guardar" });

    await act(async () => {
      fireEvent.click(saveButton);
      expect(mockStartSavingEvent).toHaveBeenCalled();
    });
    expect(mockCloseDateModal).toHaveBeenCalled();
  });

  test("should throw an error message if start and end date are equals", async () => {
    (useCalendarStore as any).useCalendarStore = vi.fn().mockReturnValue({
      activeEvent: events[0],
      startSavingEvent: mockStartSavingEvent,
    });
    (useUiStore as any).useUiStore = vi.fn().mockReturnValue({
      isDateModalOpen: true,
      closeDateModal: mockCloseDateModal,
    });
    render(<CalendarModal />);
    const saveButton = screen.getByRole("button", { name: "Guardar" });
    const endDateInput = screen.getByDisplayValue("19/12/2022, 15:00");
    fireEvent.change(endDateInput, { target: { value: "19/12/2022, 13:00" } });

    await act(async () => {
      fireEvent.click(saveButton);
    });
    expect(screen.getByRole("heading", { level: 2 }).textContent).toContain(
      "Fechas incorrectas"
    );
  });
});
