"use client";

import AgencySettingsLayout from "@/components/layout/AgencySettingsLayout";
import {
  useMyAgencyUserQuery,
  useUpdateMyAgencyMutation,
  Language,
} from "@/graphql/generated";
import { getDirtyValues } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { useTranslation } from "react-i18next";

interface IAgencyUserSettingsForm {
  agencyUser: {
    name: string;
    language: Language;
  };
}

const initialSetupSchema: ZodType<IAgencyUserSettingsForm> = z.object({
  agencyUser: z.object({
    name: z.string().min(1, "Agency user name is required"),
    language: z.nativeEnum(Language),
  }),
});

const AgencyUser = () => {
  const [
    updateMyAgency,
    {
      error,
      reset: resetMutation,
      data: mutationData,
      loading: mutationLoading,
    },
  ] = useUpdateMyAgencyMutation();

  const { data, loading, refetch } = useMyAgencyUserQuery();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset: resetForm,
  } = useForm<IAgencyUserSettingsForm>({
    resolver: zodResolver(initialSetupSchema),
  });

  useEffect(() => {
    // Set the form values to the fetched data
    resetForm({
      agencyUser: {
        name: data?.myAgencyUser?.name ?? "",
        language: data?.myAgencyUser?.language ?? Language.En,
      },
    });
  }, [data]);

  const onSubmit = (params: IAgencyUserSettingsForm) => {
    resetMutation();

    const dirtyValues = getDirtyValues(dirtyFields, params);
    updateMyAgency({
      variables: {
        input: dirtyValues,
      },
      onCompleted: async () => {
        await refetch();

        // use window.location.href to reload agency user language
        window.location.href = `/app/agency_user`;
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
        <h1 className="font-bold text-xl mb-4">{t("agency-user")}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="agencyUser.name"
              className="block text-sm font-medium mb-1"
            >
              {t("agency-user-name")}
            </label>
            <input
              id="agencyUser.name"
              type="text"
              {...register("agencyUser.name")}
              className="border px-3 py-2 rounded w-full disabled:bg-gray-100"
              disabled={loading}
            />
            {errors.agencyUser?.name?.message && (
              <p className="mt-1 text-red-500">
                {errors.agencyUser.name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="agencyUser.language"
              className="block text-sm font-medium mb-1"
            >
              {t("common:language")}
            </label>
            <select
              id="agencyUser.language"
              {...register("agencyUser.language")}
              className="border px-3 py-2 rounded w-full disabled:bg-gray-100"
              disabled={loading}
            >
              {Object.values(Language).map(lang => (
                <option key={lang} value={lang}>
                  {t(`common:${lang}`)}
                </option>
              ))}
            </select>
            {errors.agencyUser?.language?.message && (
              <p className="mt-1 text-red-500">
                {errors.agencyUser.language.message}
              </p>
            )}
          </div>
          {error && <div className="text-red-500">{error.message}</div>}
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || mutationLoading || !isDirty}
            >
              {t("common:apply")}
            </button>
          </div>
          {mutationData?.updateMyAgency?.success && (
            <div className="text-green-500">
              Agency user updated successfully
            </div>
          )}
        </form>
      </div>
    </AgencySettingsLayout>
  );
};

export default AgencyUser;
