import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  id: string;
  type?: string;
  label: string;
  register: UseFormRegister<any>;
  autoComplete?: string;
  className?: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  type,
  label,
  register,
  autoComplete,
  className,
  error,
}) => {
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
      <div className="mt-2">
        <input
          id={id}
          type={type}
          // autoComplete={autoComplete || type}
          className={`${baseClasses} ${focusClasses} ${additionalClasses}`}
          {...register(id)}
        />
      </div>
      <p className="text-sm text-error">{error}</p>
    </div>
  );
};

export default TextField;
