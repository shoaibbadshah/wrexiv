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
  agencyUser: {
    name: string;
  };
}

const initialSetupSchema: ZodType<IAgencyUserSettingsForm> = z.object({
  agencyUser: z.object({
    name: z.string().min(1, "Agency user name is required"),
  }),
});

const AgencyUser = () => {
  const [
    updateMyAgency,
    { error, reset, data: mutationData, loading: mutationLoading },
  ] = useUpdateMyAgencyMutation();

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

    // Do not submit if the agency user name is the same as the current agency user name
    if (params.agencyUser.name == data?.myAgencyUser?.name) {
      return;
    }

    updateMyAgency({
      variables: {
        input: params,
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
              htmlFor="agencyUser.name"
              className="block text-sm font-medium mb-1"
            >
              Agency User Name
            </label>
            <input
              id="agencyUser.name"
              type="text"
              {...register("agencyUser.name", {
                required: "Agency name is required",
              })}
              className="border px-3 py-2 rounded w-full disabled:bg-gray-100"
              defaultValue={data?.myAgencyUser?.name}
              disabled={loading}
            />
            {errors.agencyUser?.name?.message && (
              <p className="mt-1 text-red-500">
                {errors.agencyUser.name.message}
              </p>
            )}
          </div>
          {error && <div className="text-red-500">{error.message}</div>}
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || mutationLoading}
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
