import { useCalendarStore } from "./../../src/hooks/useCalendarStore";
import { configureStore } from "@reduxjs/toolkit";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { act, waitFor } from "@testing-library/react";

import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "./../__fixtures__/authStates";
import { initialState as calendarInitialState } from "./../__fixtures__/calendarStates";
import { testUserCredentials } from "./../__fixtures__/testUser";
import { useAuthStore } from "./../../src/hooks/useAuthStore";
import { renderStoreHookWithProviders } from "./../__utils__/test-utils";
import {
  authSlice,
  AuthState,
  AUTH_STATUS,
  calendarSlice,
  CalendarState,
} from "../../src/store";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState: AuthState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

const getMockCalendarStore = (initialState: CalendarState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      calendar: calendarSlice.reducer,
    },
    preloadedState: {
      calendar: { ...initialState },
    },
  });
};

describe("Tests of useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear(); // clear localStorage if there is any of another tests
  });

  test("should return default values", () => {
    const mockStore = getMockStore({
      status: AUTH_STATUS.CHECKING,
      user: {
        name: "",
        uid: "",
      },
      errorMessage: undefined,
    });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);
    expect(result.current).toEqual({
      status: AUTH_STATUS.CHECKING,
      user: {
        name: "",
        uid: "",
      },
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin should do login correctly", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });
    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.AUTHENTICATED,
      user: { name: "Test User", uid: "63a08252eec1c64e6c7bec31" },
      errorMessage: undefined,
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-expires-date")).toEqual(
      expect.any(String)
    );
  });

  test("startLogin should fail authentication", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);

    await act(async () => {
      await result.current.startLogin({
        email: "asfasf@google.com",
        password: "23334455",
      });
    });
    const { status, user, errorMessage } = result.current;
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("token-expires-date")).toBe(null);
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      errorMessage: expect.any(String),
      user: { name: "", uid: "" },
    });

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined), {
      timeout: 2000,
    });
  });

  test("startRegister should create a user", async () => {
    const newUser = {
      name: "asfasf",
      email: "asfasf@google.com",
      password: "23334455",
    };
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);

    const spy = vi.spyOn(calendarApi, "post").mockReturnValue(
      Promise.resolve({
        data: {
          ok: true,
          uid: "123432345",
          name: "Test User",
          token: "SOME_TOKEN",
        },
      })
    );

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.AUTHENTICATED,
      errorMessage: undefined,
      user: { name: "Test User", uid: "123432345" },
    });
    spy.mockRestore(); // destroy spy
  });

  test("startRegister should fail registration because user already exists", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);
    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: { name: "", uid: "" },
      errorMessage: "Ya existe un usuario con ese email",
    });
  });

  test("startRegister should fail registration by error in fields", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);
    await act(async () => {
      await result.current.startRegister({
        email: "asfasfgoogle.com",
        password: "23334455",
        name: "Test User",
      });
    });

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: { name: "", uid: "" },
      errorMessage: "El email es obligatorio",
    });
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined), {
      timeout: 2000,
    });
  });

  test("checkAuthToken should fail if there is not a token", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: { name: "", uid: "" },
      errorMessage: undefined,
    });
  });

  test("checkAuthToken should authenticate user if there is a token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "token-expires-date",
      new Date().getTime() + 2 * 60 * 60 * 1000 + ""
    );
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.AUTHENTICATED,
      user: { name: "Test User", uid: "63a08252eec1c64e6c7bec31" },
      errorMessage: undefined,
    });
  });

  test("checkAuthToken should logout if token is expired", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "token-expires-date",
      new Date().getTime() - 2 * 60 * 60 * 1000 + ""
    );
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: { name: "", uid: "" },
      errorMessage: undefined,
    });
  });

  test("checkAuthToken should logout if token is not correct", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token + "sawdfdsw");
    localStorage.setItem(
      "token-expires-date",
      new Date().getTime() + 2 * 60 * 60 * 1000 + ""
    );
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: { name: "", uid: "" },
      errorMessage: undefined,
    });
  });

  test("should clear token and all store", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);
    const mockStore = getMockStore({ ...authenticatedState });
    const { result } = renderStoreHookWithProviders(useAuthStore, mockStore);

    await act(async () => {
      await result.current.startLogout();
    });

    const { status, user, errorMessage } = result.current;

    expect(localStorage.getItem("token")).toBe(null);
    // Auth store should be cleared
    expect({ status, user, errorMessage }).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: { name: "", uid: "" },
      errorMessage: undefined,
    });

    // Calendar store should be cleared
    const mockCalendarStore = getMockCalendarStore({ ...calendarInitialState });
    const { result: calendarResult } = renderStoreHookWithProviders(
      useCalendarStore,
      mockCalendarStore
    );
    const { events, activeEvent, hasEventSelected } = calendarResult.current;

    expect({ events, activeEvent, hasEventSelected }).toEqual({
      events: [],
      activeEvent: null,
      hasEventSelected: false,
    });
  });
});
