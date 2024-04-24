"use client";

import AgencySettingsLayout from "@/components/layout/AgencySettingsLayout";
import { useMyAgencyUserQuery } from "@/graphql/generated";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface IAgencySettingsForm {
  agencyName: string;
}

const Agency = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAgencySettingsForm>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const onSubmit = async (params: IAgencySettingsForm) => {
    const { agencyName } = params;
    console.log(agencyName);
  };

  const { data, loading } = useMyAgencyUserQuery();

  return (
    <AgencySettingsLayout>
      <div className="mx-12 py-8 w-full max-w-2xl">
        <h1 className="font-bold text-xl mb-4">Agency</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="agencyName"
              className="block text-sm font-medium mb-1"
            >
              Agency Name
            </label>
            <input
              id="agencyName"
              type="text"
              {...register("agencyName", {
                required: "Agency name is required",
              })}
              className="border px-3 py-2 rounded w-full disabled:bg-gray-100"
              defaultValue={data?.myAgencyUser?.agency?.name}
              disabled={loading}
            />
            {errors.agencyName && (
              <p className="mt-1 text-red-500">{errors.agencyName.message}</p>
            )}
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div>
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AgencySettingsLayout>
  );
};

export default Agency;
