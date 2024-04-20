import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-lg p-8 border w-full shadow-lg rounded-md bg-white">
      {children}
    </div>
  );
};

export default Container;
