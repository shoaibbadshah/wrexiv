"use client";

import TextField from "../molecules/formInputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import CustomField from "../molecules/formInputs/CustomField";
import TextareaField from "../molecules/formInputs/TextareaField";
import NumberField from "../molecules/formInputs/NumberField";
import { useCreateTenantMutation } from "@/graphql/generated";
import useCurrentTenantUser from "@/hooks/useCurrentTenant";

type PropsType = {
  handleAfterSave: () => void;
};

type Inputs = {
  name: string;
  website: string;
  tenantUser: {
    name: string;
  };
};

const schema = z.object({
  name: z.string().min(1),
  website: z.string().min(1),
  tenantUser: z.object({
    name: z.string().min(1),
  }),
});

const TenantNewForm = ({ handleAfterSave }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      website: "",
      tenantUser: {
        name: "",
      },
    },
  });

  const { refetch } = useCurrentTenantUser();
  const [createTenant, { loading }] = useCreateTenantMutation();

  const onSubmit: SubmitHandler<Inputs> = input => {
    createTenant({
      variables: {
        input,
      },
      onCompleted: async () => {
        await refetch();
        handleAfterSave();
      },
      onError: error => {
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        id="name"
        label="Organization Name"
        type="text"
        register={register}
      />
      <TextField
        id="website"
        label="Website URL"
        type="text"
        register={register}
      />
      <TextField
        id="tenantUser.name"
        label="Your Name"
        type="text"
        register={register}
      />
      <div className="flex justify-end">
        <button className="btn btn-primary">
          {loading ? <span className="loading loading-spinner"></span> : "Save"}
        </button>
      </div>
    </form>
  );
};

export default TenantNewForm;
