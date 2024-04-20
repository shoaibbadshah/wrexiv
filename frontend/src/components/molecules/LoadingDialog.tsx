import { Dialog, DialogContent } from "@mui/material";
import LoadingBars from "../atoms/LoadingBars";

const LoadingDialog = () => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <LoadingBars />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
