import useFlash from "@/hooks/useFlash";
import React from "react";

type PropsType = {
  target: string;
  children: React.ReactNode;
};

const ClipboardCopyButton = ({ target, children }: PropsType) => {
  const { showMessage } = useFlash();

  const copyTextToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage("Copied to clipboard");
    } catch (err) {
      showMessage("Failed to copy to clipboard", "error");
    }
  };

  return (
    <button onClick={() => copyTextToClipboard(target)}>{children}</button>
  );
};

export default ClipboardCopyButton;
