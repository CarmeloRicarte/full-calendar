import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import * as useAuthStore from "../../src/hooks/useAuthStore";
import { AUTH_STATUS } from "../../src/store";
import { AppRouter } from "../../src/router/AppRouter";

// mock useAuthStore
vi.mock("../../src/hooks/useAuthStore");

// mock CalendarPage. Is not mandatory to create a mock
//of all component for check if app have navigated to CalendarPage
vi.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Tests of <AppRouter />", () => {
  const mockCheckAuthToken = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should show loading", () => {
    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      status: AUTH_STATUS.CHECKING,
      checkAuthToken: mockCheckAuthToken,
    });
    render(<AppRouter />);
    expect(mockCheckAuthToken).toHaveBeenCalled();
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  test("should show login if user is not authenticated", () => {
    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      checkAuthToken: mockCheckAuthToken,
    });
    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("should show calendar page if user is authenticated", () => {
    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      status: AUTH_STATUS.AUTHENTICATED,
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
