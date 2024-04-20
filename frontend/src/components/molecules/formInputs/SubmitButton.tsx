import React from "react";

interface SubmitButtonProps {
  text: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, className }) => {
  const baseClasses =
    "rounded-md px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const additionalClasses =
    className || "bg-indigo-600 text-white focus-visible:outline-indigo-600";

  return (
    <button type="submit" className={`${baseClasses} ${additionalClasses}`}>
      {text}
    </button>
  );
};

export default SubmitButton;
