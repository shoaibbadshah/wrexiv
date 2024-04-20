"use client";

import React, { useState, FC } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

interface CountrySelectProps {
  // Define any props here if needed
}

const CountrySelect: FC<CountrySelectProps> = props => {
  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const selectCountry = (val: string) => {
    setCountry(val);
  };

  const selectRegion = (val: string) => {
    setRegion(val);
  };

  return (
    <div>
      <CountryDropdown value={country} onChange={val => selectCountry(val)} />
      <RegionDropdown
        country={country}
        value={region}
        onChange={val => selectRegion(val)}
      />
    </div>
  );
};

export default CountrySelect;
