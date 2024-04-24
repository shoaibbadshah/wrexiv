"use client";

import AgencySettingsLayout from "@/components/layout/AgencySettingsLayout";
import {
  useMyAgencyUserQuery,
  useUpdateMyAgencyMutation,
} from "@/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

interface IAgencyUserSettingsForm {
  agencyUserName: string;
}

const AgencyUser = () => {
  const [updateMyAgency, { error, reset, data: mutationData }] =
    useUpdateMyAgencyMutation();
  const initialSetupSchema: ZodType<IAgencyUserSettingsForm> = z.object({
    agencyUserName: z.string().min(1, "Agency name is required"),
  });

  const { data, loading, refetch } = useMyAgencyUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAgencyUserSettingsForm>({
    resolver: zodResolver(initialSetupSchema),
  });

  const onSubmit = async (params: IAgencyUserSettingsForm) => {
    reset();

    const { agencyUserName } = params;

    if (agencyUserName == data?.myAgencyUser?.name) {
      return;
    }

    updateMyAgency({
      variables: {
        input: {
          agencyUser: {
            name: agencyUserName,
          },
        },
      },
      onCompleted: () => {
        refetch();
      },
      onError: () => {
        // do nothing
        // error message already obtained from useCreateAgencyMutation
      },
    });
  };

  return (
    <AgencySettingsLayout>
      <div className="mx-12 py-8 w-full max-w-2xl">
        <h1 className="font-bold text-xl mb-4">Agency User</h1>
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
              defaultValue={data?.myAgencyUser?.name}
              disabled={loading}
            />
            {errors.agencyUserName && (
              <p className="mt-1 text-red-500">
                {errors.agencyUserName.message}
              </p>
            )}
          </div>
          {error && <div className="text-red-500">{error.message}</div>}
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Submit
            </button>
          </div>
          {mutationData?.updateMyAgency?.success && (
            <div className="text-green-500">
              {mutationData?.updateMyAgency?.message}
            </div>
          )}
        </form>
      </div>
    </AgencySettingsLayout>
  );
};

export default AgencyUser;
