import React from "react";
import { UseFormRegister } from "react-hook-form";

interface NumberFieldProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  autoComplete?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

const NumberField: React.FC<NumberFieldProps> = ({
  id,
  label,
  register,
  autoComplete,
  className,
  min,
  max,
  step,
}) => {
  const baseClasses =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6";
  const focusClasses = "focus:ring-2 focus:ring-inset focus:ring-indigo-600";
  const additionalClasses = className || "";

  return (
    <div className="w-full">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type="number" // typeを"number"に固定
          autoComplete={autoComplete || "off"} // 数値入力フィールドで自動補完をオフにする場合が多い
          className={`${baseClasses} ${focusClasses} ${additionalClasses}`}
          min={min} // 最小値
          max={max} // 最大値
          step={step} // 増分
          {...register(id)}
        />
      </div>
    </div>
  );
};

export default NumberField;
