import { Autocomplete, FormControl, TextField } from "@mui/material";
import { CountryEnum } from "@/graphql/generated";
import { countries } from "@/constants/countries";

type CountryOption = {
  value: keyof typeof CountryEnum;
  label: string;
};

const countryOptions: CountryOption[] = Object.entries(CountryEnum).map(
  ([value, label]) => ({
    value: value.toUpperCase() as keyof typeof CountryEnum,
    label: countries[value.toLowerCase() as keyof typeof countries],
  })
);

interface CountrySelectInputProps {
  values: CountryEnum[];
  onChange: (newValue: CountryEnum[]) => void; // Expect an array of CountryEnum
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  inputRef?: React.Ref<any>;
}

const CountrySelectInput = ({
  values,
  onChange,
  label,
  placeholder,
  errorMessage,
  inputRef,
}: CountrySelectInputProps) => {
  const selectedOptions = countryOptions.filter(option =>
    values.includes(option.value as CountryEnum)
  );

  return (
    <FormControl fullWidth>
      <Autocomplete
        multiple
        options={countryOptions}
        getOptionLabel={option => option.label}
        value={selectedOptions}
        onChange={(_, newValue) => {
          // Map CountryOption[] back to CountryEnum[] when calling onChange
          const newValues: CountryEnum[] = newValue.map(
            option => option.value as CountryEnum
          );
          onChange(newValues);
        }}
        renderInput={params => (
          <TextField
            {...params}
            label={label || "Countries"} // Default label if none provided
            placeholder={placeholder || "Select countries"} // Default placeholder if none provided
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            inputRef={inputRef}
            InputProps={{
              ...params.InputProps,
              sx: {
                outline: "none !important",
                boxShadow: "none !important",
                border: "none !important",
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default CountrySelectInput;
