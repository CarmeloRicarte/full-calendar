import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum AUTH_STATUS {
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not-authenticated",
}

export interface User {
  name: string;
  email: string;
  password: string;
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
    email: "",
    password: "",
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
        email: "",
        password: "",
      };
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = AUTH_STATUS.AUTHENTICATED;
      state.user = payload;
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin } = authSlice.actions;
