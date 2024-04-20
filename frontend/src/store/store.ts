import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

import authReducer, { initialState as authState } from "./authSlice";
import snackbarReducer, {
  initialState as snackbarState,
} from "./snackbarSlice";
import mobileMenuReducer, {
  initialState as mobileMenuState,
} from "./mobileMenuSlice";
import contentGenerationReducer, {
  initialState as contentGenerationState,
} from "./contentGenerationSlice";
import leadsReducer, { initialState as leadsState } from "./leadsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  mobileMenu: mobileMenuReducer,
  contentGeneration: contentGenerationReducer,
  leads: leadsReducer,
});

const preloadedState = () => ({
  auth: authState,
  snackbar: snackbarState,
  mobileMenu: mobileMenuState,
  contentGeneration: contentGenerationState,
  leads: leadsState,
});

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
