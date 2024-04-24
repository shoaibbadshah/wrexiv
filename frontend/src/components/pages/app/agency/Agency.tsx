"use client";

import AgencySettingsLayout from "@/components/layout/AgencySettingsLayout";
import {
  useMyAgencyUserQuery,
  useUpdateMyAgencyMutation,
} from "@/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
interface IAgencySettingsForm {
  agencyName: string;
}

const Agency = () => {
  const [
    updateMyAgency,
    { error, reset, data: mutationData, loading: mutationLoading },
  ] = useUpdateMyAgencyMutation();
  const initialSetupSchema: ZodType<IAgencySettingsForm> = z.object({
    agencyName: z.string().min(1, "Agency name is required"),
  });
  const { data, loading, refetch } = useMyAgencyUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAgencySettingsForm>({
    resolver: zodResolver(initialSetupSchema),
  });

  const onSubmit = async (params: IAgencySettingsForm) => {
    reset();

    const { agencyName } = params;

    if (agencyName == data?.myAgencyUser?.agency?.name) {
      return;
    }

    updateMyAgency({
      variables: {
        input: {
          name: agencyName,
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
              {...register("agencyName")}
              className="border px-3 py-2 rounded w-full disabled:bg-gray-100"
              defaultValue={data?.myAgencyUser?.agency?.name}
              disabled={loading}
            />
            {errors.agencyName && (
              <p className="mt-1 text-red-500">{errors.agencyName.message}</p>
            )}
          </div>
          {error && <div className="text-red-500">{error.message}</div>}
          <div>
            <button
              disabled={loading || mutationLoading}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
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

export default Agency;
