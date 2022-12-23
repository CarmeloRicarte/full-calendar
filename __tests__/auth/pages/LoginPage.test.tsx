import { describe, test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth";
import * as useAuthStore from "../../../src/hooks/useAuthStore";

vi.mock("../../../src/hooks/useAuthStore");

describe("Tests of <LoginPage />", () => {
  const mockStartLogin = vi.fn();
  const mockStartRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render correctly", () => {
    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      errorMessage: undefined,
    });
    render(<LoginPage />);
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(screen.getByText("Registro")).toBeTruthy();
  });

  test("loginSubmit should call to start login with email and password ", () => {
    const user = {
      email: "email@email.com",
      password: "password",
    };

    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      errorMessage: undefined,
      startLogin: mockStartLogin,
    });
    render(<LoginPage />);
    const inputEmail = screen.getByTestId("login-email-input");
    const inputPassword = screen.getByTestId("login-password-input");
    const btnLogin = screen.getByRole("button", { name: "Login" });
    fireEvent.change(inputEmail, { target: { value: user.email } });
    fireEvent.change(inputPassword, { target: { value: user.password } });
    fireEvent.click(btnLogin);
    expect(mockStartLogin).toHaveBeenCalledWith(user);
  });

  test("should have an error in authentication", () => {
    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      errorMessage: "Error en la autenticación",
      startLogin: mockStartLogin,
    });
    render(<LoginPage />);
    expect(screen.getAllByText("Error en la autenticación")).toBeTruthy();
  });

  test("registerSubmit should show an error because passwords does not be equals", () => {
    const user = {
      name: "Test",
      email: "email@email.com",
      password: "password",
      password2: "password2",
    };
    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      startRegister: mockStartRegister,
    });
    render(<LoginPage />);

    const inputName = screen.getByTestId("register-name-input");
    const inputEmail = screen.getByTestId("register-email-input");
    const inputPassword = screen.getByTestId("register-password-input");
    const inputPassword2 = screen.getByTestId("register-password2-input");
    const btnRegister = screen.getByRole("button", { name: "Crear cuenta" });

    fireEvent.change(inputName, { target: { value: user.name } });
    fireEvent.change(inputEmail, { target: { value: user.email } });
    fireEvent.change(inputPassword, { target: { value: user.password } });
    fireEvent.change(inputPassword2, { target: { value: user.password2 } });
    fireEvent.click(btnRegister);
    expect(screen.getAllByText("Contraseñas no son iguales")).toBeTruthy();
  });

  test("registerSubmit should call to startRegister with user data", () => {
    const user = {
      name: "Test",
      email: "email@email.com",
      password: "password2",
      password2: "password2",
    };
    (useAuthStore as any).useAuthStore = vi.fn().mockReturnValue({
      startRegister: mockStartRegister,
    });
    render(<LoginPage />);

    const inputName = screen.getByTestId("register-name-input");
    const inputEmail = screen.getByTestId("register-email-input");
    const inputPassword = screen.getByTestId("register-password-input");
    const inputPassword2 = screen.getByTestId("register-password2-input");
    const btnRegister = screen.getByRole("button", { name: "Crear cuenta" });

    fireEvent.change(inputName, { target: { value: user.name } });
    fireEvent.change(inputEmail, { target: { value: user.email } });
    fireEvent.change(inputPassword, { target: { value: user.password } });
    fireEvent.change(inputPassword2, { target: { value: user.password2 } });
    fireEvent.click(btnRegister);
    expect(mockStartRegister).toHaveBeenCalledWith({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  });
});
