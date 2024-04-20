import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction, Draft } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type MobileMenuState = {
  open: boolean;
};

export const initialState: MobileMenuState = {
  open: false,
};

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState,
  reducers: {
    setOpen: (
      state: Draft<MobileMenuState>,
      action: PayloadAction<boolean>
    ) => {
      state.open = action.payload;
    },
  },
});

export const useMobileMenuState = () =>
  useSelector((state: { mobileMenu: MobileMenuState }) => state.mobileMenu);

export const { setOpen } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
