import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction, Draft } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type State = {
  selectedLeadIds?: string[];
  companyDomains?: string[];
};

export const initialState: State = {
  selectedLeadIds: undefined,
  companyDomains: undefined,
};

const slice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setCompanyDomains: (
      state: Draft<State>,
      action: PayloadAction<string[]>
    ) => {
      state.companyDomains = action.payload;
    },
    setSelectedLeadIds: (
      state: Draft<State>,
      action: PayloadAction<string[]>
    ) => {
      state.selectedLeadIds = action.payload;
    },
  },
});

export const useLeadsState = () =>
  useSelector((state: { leads: State }) => state.leads);

export const { setCompanyDomains, setSelectedLeadIds } = slice.actions;

export default slice.reducer;
