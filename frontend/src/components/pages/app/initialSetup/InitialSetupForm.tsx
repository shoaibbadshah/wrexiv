"use client";

import { useForm } from "react-hook-form";
import Container from "@/components/molecules/Container";
import { FIRST_APP_PAGE } from "@/constants/urls";
import { useCreateAgencyMutation } from "@/graphql/generated";
import { ApolloError } from "@apollo/client";
import { useState } from "react";

interface INewUserFormInput {
  agencyName: string;
  agencyUserName: string;
}

const InitialSetupForm = () => {
  const [createAgency] = useCreateAgencyMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUserFormInput>();

  const onSubmit = async (params: INewUserFormInput) => {
    const { agencyName, agencyUserName } = params;
    try {
      const { data } = await createAgency({
        variables: {
          input: {
            name: agencyName,
            agencyUser: {
              name: agencyUserName,
            },
          },
        },
      });
      setErrorMessage("");

      if (data?.createAgency?.agency) {
        // use window.location.href to perform a full page reload
        window.location.href = FIRST_APP_PAGE;
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage("An error occurred");
      }
    }
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
            {...register("agencyName", {
              required: "Agency name is required",
            })}
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
            {...register("agencyUserName", {
              required: "Agency user name is required",
            })}
            className="border px-3 py-2 rounded w-full"
          />
          {errors.agencyName && (
            <p className="mt-1 text-red-500">
              {errors.agencyUserName?.message}
            </p>
          )}
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
