"use client";

import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSnackbarState, close } from "@/store/snackbarSlice";

const Snackbar = () => {
  const { open, message, severity } = useSnackbarState();
  const dispatch = useDispatch();
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => dispatch(close())}
      message={message}
    >
      <Alert
        onClose={() => dispatch(close())}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
