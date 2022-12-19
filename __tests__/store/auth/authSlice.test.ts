import { describe, test, expect } from "vitest";
import { testUserCredentials } from "./../../__fixtures__/testUser";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "./../../__fixtures__/authStates";
import {
  authSlice,
  AUTH_STATUS,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";

describe("Tests of authSlice", () => {
  test("should return initial state", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("should do login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: AUTH_STATUS.AUTHENTICATED,
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("should do logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: {
        name: "",
        uid: "",
      },
      errorMessage: undefined,
    });
  });

  test("should do logout with message", () => {
    const errorMessage = "Invalid credentials";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      user: {
        name: "",
        uid: "",
      },
      errorMessage,
    });

    test("should clear error message", () => {
      const errorMessage = "Invalid credentials";
      const state = authSlice.reducer(
        authenticatedState,
        onLogout(errorMessage)
      );
      const newState = authSlice.reducer(state, clearErrorMessage());
      expect(newState.errorMessage).toBe(undefined);
    });

    test("should have checking status", () => {
      const state = authSlice.reducer(notAuthenticatedState, onChecking());
      expect(state.status).toBe(AUTH_STATUS.CHECKING);
    });
  });
});
