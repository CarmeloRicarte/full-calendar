import { describe, test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../../src/calendar/components/Navbar/Navbar";
import * as useAuthStore from "../../../../src/hooks/useAuthStore";
import { testUserCredentials } from "../../../__fixtures__/testUser";

vi.mock("../../../../src/hooks/useAuthStore");

describe("Tests of <Navbar />", () => {
  const mockStartLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render correctly showing the user name", () => {
    (useAuthStore as any).useAuthStore.mockReturnValue({
      user: testUserCredentials,
      startLogout: mockStartLogout,
    });
    const { container } = render(<Navbar />);
    expect(screen.getByText(testUserCredentials.name)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("should call startLogout on click button", () => {
    (useAuthStore as any).useAuthStore.mockReturnValue({
      user: testUserCredentials,
      startLogout: mockStartLogout,
    });
    render(<Navbar />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockStartLogout).toHaveBeenCalled();
  });
});
