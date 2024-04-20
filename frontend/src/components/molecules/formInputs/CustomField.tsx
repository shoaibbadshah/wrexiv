import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  label: string;
  className?: string;
  field: React.ReactNode;
}

const TextField: React.FC<TextFieldProps> = ({ label, className, field }) => {
  const baseClasses =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6";
  const focusClasses = "focus:ring-2 focus:ring-inset focus:ring-indigo-600";
  const additionalClasses = className || "";

  return (
    <div className="w-full">
      <label
        // htmlFor={id} ないほうが使いやすい
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">{field}</div>
    </div>
  );
};

export default TextField;
