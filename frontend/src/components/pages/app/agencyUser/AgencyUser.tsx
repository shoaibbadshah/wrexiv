"use client";

import AgencySettingsLayout from "@/components/layout/AgencySettingsLayout";
import {
  useCurrentAgencyQuery,
  useCurrentAgencyUserQuery,
} from "@/graphql/generated";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IAgencyUserSettingsForm {
  agencyUserName: string;
}

const AgencyUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAgencyUserSettingsForm>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const onSubmit = async (params: IAgencyUserSettingsForm) => {
    const { agencyUserName } = params;
    console.log(agencyUserName);
  };

  const { data, loading } = useCurrentAgencyUserQuery();

  return (
    <AgencySettingsLayout>
      <div className="mx-12 py-8 w-full max-w-2xl">
        <h1 className="font-bold text-xl mb-4">Agency</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="agencyUserName"
              className="block text-sm font-medium mb-1"
            >
              Agency User Name
            </label>
            <input
              id="agencyUserName"
              type="text"
              {...register("agencyUserName", {
                required: "Agency name is required",
              })}
              className="border px-3 py-2 rounded w-full disabled:bg-gray-100"
              defaultValue={data?.currentAgencyUser?.name}
              disabled={loading}
            />
            {errors.agencyUserName && (
              <p className="mt-1 text-red-500">
                {errors.agencyUserName.message}
              </p>
            )}
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AgencySettingsLayout>
  );
};

export default AgencyUser;
