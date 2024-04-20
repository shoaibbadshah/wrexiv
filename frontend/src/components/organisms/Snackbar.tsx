"use client";

import { useDispatch } from "react-redux";
import { useSnackbarState, close } from "@/store/snackbarSlice";

const Snackbar = () => {
  const { open, message, severity } = useSnackbarState();
  const dispatch = useDispatch();
  return (
    <div className={`${open ? "flex" : "hidden"}`}>
      {message}
      <button onClick={() => dispatch(close())}>Close</button>
    </div>
  );
};

export default Snackbar;
