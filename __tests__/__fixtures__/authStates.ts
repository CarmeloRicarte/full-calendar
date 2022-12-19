import { AuthState, AUTH_STATUS } from "./../../src/store/auth/authSlice";

export const initialState: AuthState = {
  status: AUTH_STATUS.CHECKING,
  user: {
    name: "",
    uid: "",
  },
  errorMessage: undefined,
};

export const authenticatedState: AuthState = {
  status: AUTH_STATUS.AUTHENTICATED,
  user: {
    name: "Test",
    uid: "abc",
  },
  errorMessage: undefined,
};

export const notAuthenticatedState: AuthState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: {
    name: "",
    uid: "",
  },
  errorMessage: undefined,
};
