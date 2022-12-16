import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum AUTH_STATUS {
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not-authenticated",
}

export interface User {
  name: string;
  uid: string;
}

export interface AuthState {
  status: string;
  user: User;
  errorMessage: string | undefined;
}

const initialState: AuthState = {
  status: AUTH_STATUS.CHECKING,
  user: {
    name: "",
    uid: "",
  },
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = AUTH_STATUS.CHECKING;
      state.user = {
        name: "",
        uid: "",
      };
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = AUTH_STATUS.AUTHENTICATED;
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = AUTH_STATUS.NOT_AUTHENTICATED;
      state.user = initialState.user;
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
