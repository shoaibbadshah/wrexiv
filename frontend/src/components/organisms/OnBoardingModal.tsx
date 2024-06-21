"use client";

import useChatConversation from "@/hooks/useChatConversation";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

type PropsType = {
  open: boolean;
  onClose: () => void;
};

const OnBoardingModal = ({ open, onClose }: PropsType) => {
  const ref = useRef(false);
  const [input, setInput] = useState("");

  const { response, loading, handleStart, sendUserMessage, hasFinished } =
    useChatConversation({ turnLimit: 4 });

  const handleSubmit = () => {
    sendUserMessage(input);
    setInput("");
  };

  useEffect(() => {
    if (open) {
      ref.current = true;
      console.log("how many times");
      handleStart();
    } else {
      ref.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leads Request</DialogTitle>
      {hasFinished ? (
        <DialogContent sx={{ minWidth: 600 }}>
          Thank you! Based on the information provided, we will proceed with
          acquiring leads. It may take some time, but we will notify you by
          email once the leads have been acquired.
        </DialogContent>
      ) : (
        <DialogContent sx={{ minWidth: 600 }}>
          <div className="space-y-4">
            <div dangerouslySetInnerHTML={{ __html: response }}></div>
            {!loading && (
              <div className="space-y-2">
                <p>Your Answer</p>
                <TextField
                  multiline
                  fullWidth
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              </div>
            )}
          </div>
        </DialogContent>
      )}
      <DialogActions sx={{ p: 3 }}>
        <button className="btn" onClick={onClose}>
          Close
        </button>
        {!hasFinished && (
          <button className="btn btn-primary" onClick={handleSubmit}>
            {loading ? (
              <span className="loading loading-ring loading-sm"></span>
            ) : (
              "Submit"
            )}
          </button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OnBoardingModal;
