"use client";

import { useForm } from "react-hook-form";
import Container from "@/components/molecules/Container";
import { FIRST_APP_PAGE } from "@/constants/urls";
import { useCreateAgencyMutation } from "@/graphql/generated";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface INewUserFormInput {
  agencyName: string;
  agencyUserName: string;
}

const InitialSetupForm = () => {
  const [createAgency, { error, reset }] = useCreateAgencyMutation();
  const initialSetupSchema: ZodType<INewUserFormInput> = z.object({
    agencyName: z.string().min(1, "Agency name is required"),
    agencyUserName: z.string().min(1, "Agency user name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUserFormInput>({
    resolver: zodResolver(initialSetupSchema),
  });

  const onSubmit = (params: INewUserFormInput) => {
    reset();

    const { agencyName, agencyUserName } = initialSetupSchema.parse(params);

    createAgency({
      variables: {
        input: {
          name: agencyName,
          agencyUser: {
            name: agencyUserName,
          },
        },
      },
      onCompleted: () => {
        // use window.location.href to perform a full page reload
        window.location.href = FIRST_APP_PAGE;
      },
      onError: () => {
        // do nothing
        // error message already obtained from useCreateAgencyMutation
      },
    });
  };

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Initial Setup</h1>
        <p>Please complete the registration by filling out the form below.</p>
      </div>
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
            className="border px-3 py-2 rounded w-full"
          />
          {errors.agencyName && (
            <p className="mt-1 text-red-500">{errors.agencyName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="agencyName"
            className="block text-sm font-medium mb-1"
          >
            Agency User Name
          </label>
          <input
            id="agencyUserName"
            type="text"
            {...register("agencyUserName")}
            className="border px-3 py-2 rounded w-full"
          />
          {errors.agencyName && (
            <p className="mt-1 text-red-500">
              {errors.agencyUserName?.message}
            </p>
          )}
        </div>
        {error && <div className="text-red-500">{error.message}</div>}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </Container>
  );
};

export default InitialSetupForm;
