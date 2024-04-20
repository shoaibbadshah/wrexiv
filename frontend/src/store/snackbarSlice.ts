import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import type { PayloadAction, Draft } from "@reduxjs/toolkit";

export type SnackbarState = {
  open: boolean;
  message?: string;
  severity?: "success" | "info" | "warning" | "error";
};

type MessageType = {
  message: string;
  severity?: SnackbarState["severity"];
};

export const initialState: SnackbarState = {
  open: false,
  message: undefined,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showMessage: (
      state: Draft<SnackbarState>,
      action: PayloadAction<MessageType>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    close: (state: Draft<SnackbarState>) => {
      state.open = false;
    },
    resetMessage: (state: Draft<SnackbarState>) => {
      state.open = false;
      state.message = undefined;
      state.severity = undefined;
    },
  },
});

export const useSnackbarState = () =>
  useSelector((state: { snackbar: SnackbarState }) => state.snackbar);

export const getSnackbarState = (state: { snackbar: SnackbarState }) =>
  state.snackbar;

export const { showMessage, close, resetMessage } = snackbarSlice.actions;

export default snackbarSlice.reducer;
