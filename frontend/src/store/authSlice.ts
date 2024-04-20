import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import type { PayloadAction, Draft } from "@reduxjs/toolkit";

type User = {
  email: string;
};

export type AuthState = {
  user?: User;
};

export const initialState: AuthState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: Draft<AuthState>, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOutAuth: (state: Draft<AuthState>) => {
      state.user = undefined;
    },
  },
});

export const useAuthState = () =>
  useSelector((state: { auth: AuthState }) => state.auth);

export const getAuthState = (state: { auth: AuthState }) => state.auth;

export const { setUser, signOutAuth } = authSlice.actions;

export default authSlice.reducer;
