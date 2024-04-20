"use client";

import Image from "next/image";
import { INDUSTRIES } from "./datasets";
import { useFormContext } from "react-hook-form";

const IndustrySelect = () => {
  const { setValue } = useFormContext();
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 overflow-auto py-8 pr-8">
      {INDUSTRIES.map(industry => {
        return (
          <div className="card min-w-80 glass" key={industry.id}>
            <figure className="relative h-40">
              <Image
                src={industry.src}
                alt={industry.name}
                fill
                className="object-cover"
              />
            </figure>
            <div className="card-body pt-3 px-4 space-y-2">
              <div className="space-y-1">
                <h2 className="card-title">{industry.name}</h2>
                <p>How to park your car at your garage?</p>
              </div>
              <div className="card-actions justify-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setValue("industry", industry.id)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IndustrySelect;
