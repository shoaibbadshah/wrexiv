import { CountryEnum } from "@/graphql/generated";
import WorldFlag from "react-world-flags";

type PropsType = {
  code: CountryEnum;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Flag = ({ code, size, className }: PropsType) => {
  const sizeMap = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
  };
  return (
    <div
      className={`flex ${size ? sizeMap[size] : "h-4"} shadow-md ${
        className || ""
      }`}
    >
      <WorldFlag code={code} />
    </div>
  );
};

export default Flag;
