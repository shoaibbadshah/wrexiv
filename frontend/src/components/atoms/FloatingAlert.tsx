import { Snackbar, Alert } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type AlertMessage = {
  message: string;
  type: "success" | "error";
};

type FloatingAlertProps = {
  message: AlertMessage | null;
  setMessage: Dispatch<SetStateAction<AlertMessage | null>>;
};

const FloatingAlert = ({ message, setMessage }: FloatingAlertProps) => {
  return (
    <Snackbar
      sx={{ marginTop: "64px" }}
      open={message !== null}
      autoHideDuration={5000}
      onClose={setMessage.bind(null, null)}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert
        onClose={setMessage.bind(null, null)}
        severity={message?.type}
        variant="filled"
        sx={{ width: "100%", minWidth: "300px", borderRadius: "0.375rem" }}
      >
        {message?.message}
      </Alert>
    </Snackbar>
  );
};

export default FloatingAlert;
