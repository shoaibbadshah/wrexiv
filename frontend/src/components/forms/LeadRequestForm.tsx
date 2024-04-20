"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "../molecules/formInputs/TextField";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import CustomField from "../molecules/formInputs/CustomField";
import TextareaField from "../molecules/formInputs/TextareaField";
import NumberField from "../molecules/formInputs/NumberField";

type PropsType = {
  open: boolean;
  onClose: () => void;
  handleAfterSubmit: () => void;
};

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  region: string;
  about: string;
  expertise: string[];
};

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  region: z.string().min(1),
  about: z.string().min(1),
  expertise: z.array(z.string().min(1)).min(1),
});

const LeadRequestForm = ({ open, onClose, handleAfterSubmit }: PropsType) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      region: "",
      about: "",
      expertise: ["Developer"],
    },
  });

  const country = watch("country");
  const region = watch("region");

  const onSubmit: SubmitHandler<Inputs> = data => {
    handleAfterSubmit();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          onClose();
        },
        sx: { minWidth: 400 },
      }}
      maxWidth="sm"
    >
      <DialogTitle>Lead Request</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <div className="">Tell us about your first lead request!</div>
          <div className="space-y-4">
            <CustomField
              label="Target Country"
              field={
                <CountryDropdown
                  classes="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={country}
                  onChange={val => setValue("country", val)}
                />
              }
            />
            <CustomField
              label="Target Region"
              field={
                <RegionDropdown
                  classes="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  country={country}
                  value={region}
                  onChange={val => setValue("region", val)}
                />
              }
            />
            <TextareaField
              id="firstName"
              label="Target Description"
              register={register}
              autoComplete="given-name"
            />
            <NumberField id="budget" label="Budget" register={register} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadRequestForm;
