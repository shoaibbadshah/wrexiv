import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  autoComplete?: string;
  className?: string;
  rows?: number; // テキストエリア用のrowsプロパティを追加
}

const TextareaField: React.FC<TextFieldProps> = ({
  id,
  label,
  register,
  autoComplete,
  className,
  rows = 3, // テキストエリアのデフォルト行数を設定
}) => {
  const baseClasses =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6";
  const focusClasses = "focus:ring-2 focus:ring-inset focus:ring-indigo-600";
  const additionalClasses = className || "";

  const inputClasses = `${baseClasses} ${focusClasses} ${additionalClasses}`;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          rows={rows}
          className={inputClasses}
          {...register(id)}
        ></textarea>
      </div>
    </div>
  );
};

export default TextareaField;
