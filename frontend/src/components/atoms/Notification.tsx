import { Snackbar, Alert } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type NotificationMessage = {
  message: string;
  type: "success" | "error";
};

type NotificationProps = {
  message: NotificationMessage | null;
  setMessage: Dispatch<SetStateAction<NotificationMessage | null>>;
};

const Notification = ({ message, setMessage }: NotificationProps) => {
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
        sx={{ width: "100%", zIndex: 50 }}
      >
        {message?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
