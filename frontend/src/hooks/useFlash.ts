import { useDispatch } from "react-redux";
import {
  showMessage as showSnackbarMessage,
  SnackbarState,
  resetMessage,
} from "@/store/snackbarSlice";

const useFlash = () => {
  const dispatch = useDispatch();

  const showMessage = (
    message: string,
    severity?: SnackbarState["severity"]
  ) => {
    dispatch(
      showSnackbarMessage({
        message,
        severity,
      })
    );
  };

  return {
    showMessage,
    resetMessage: () => dispatch(resetMessage()),
  };
};

export default useFlash;
