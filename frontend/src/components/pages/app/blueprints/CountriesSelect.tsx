"use client";

import Flag from "@/components/molecules/Flag";
import Image from "next/image";
import { z } from "zod";
import { CountryEnum } from "@/graphql/generated";
import { COUNTRIES } from "./datasets";
import { useFormContext } from "react-hook-form";

const CountriesSelect = () => {
  const { setValue } = useFormContext();
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 overflow-auto py-8 pr-8">
      {COUNTRIES.map(country => {
        return (
          <div className="card min-w-80 glass" key={country.code}>
            <figure className="relative h-40">
              <Image
                src={country.src}
                alt={country.name}
                fill
                className="object-cover"
              />
            </figure>
            <div className="card-body pt-3 px-4 space-y-2">
              <div className="space-y-1">
                <h2 className="card-title">{country.name}</h2>
                <p>How to park your car at your garage?</p>
              </div>
              <div className="card-actions justify-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setValue("country", country.code)}
                >
                  Select
                </button>
                <Flag code={country.code} size="lg" className="shadow-none" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountriesSelect;
