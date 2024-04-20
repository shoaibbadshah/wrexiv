"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import supabase from "@/lib/supabase";

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

type Props = {
  handleAfterSubmit: () => void;
};

const ExpertForm = ({ handleAfterSubmit }: Props) => {
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

  const onSubmit: SubmitHandler<Inputs> = data => {
    handleAfterSubmit();
  };

  const country = watch("country");
  const region = watch("region");

  const expertiseOptions = [
    "Developer",
    "Designer",
    "Product Manager",
    "Sales",
    "Marketer",
    "Others",
  ];

  const handleExpertiseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    let newExpertise = watch("expertise");

    if (event.target.checked) {
      newExpertise = [...newExpertise, value];
    } else {
      newExpertise = newExpertise.filter(e => e !== value);
    }

    setValue("expertise", newExpertise);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("firstName")}
            />
          </div>
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("lastName")}
            />
          </div>
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              type="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("email")}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Country / Region
          </label>
          <div className="mt-2 space-y-2">
            <CountryDropdown
              classes="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={country}
              onChange={val => setValue("country", val)}
            />
            <RegionDropdown
              classes="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              country={country}
              value={region}
              onChange={val => setValue("region", val)}
            />
          </div>
        </div>

        {false && (
          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country
            </label>
            <div className="mt-2">
              <select
                id="country"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                {...register("country")}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>
        )}

        {false && (
          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("region")}
              />
            </div>
          </div>
        )}

        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            About
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
              {...register("about")}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences about yourself.
          </p>
          {errors.about && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.about.message}
            </p>
          )}
        </div>

        <div className="space-y-6 col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Expertise
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
            {expertiseOptions.map(option => (
              <div key={option} className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id={`expertise-${option}`}
                    type="checkbox"
                    value={option}
                    onChange={handleExpertiseChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={watch("expertise")?.includes(option)}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor={`expertise-${option}`}
                    className="font-medium text-gray-900"
                  >
                    {option}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {errors.expertise && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.expertise.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ExpertForm;
