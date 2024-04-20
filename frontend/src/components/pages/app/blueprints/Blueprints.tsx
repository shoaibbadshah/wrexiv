"use client";

import Flag from "@/components/molecules/Flag";
import Image from "next/image";
import BlueprintsStepper from "./BlueprintsStepper";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CountryEnum } from "@/graphql/generated";
import { COUNTRIES } from "./datasets";
import CountriesSelect from "./CountriesSelect";
import IndustriesSelect from "./IndustriesSelect";
import LeadsSection from "./LeadsSection";
import TasksSection from "./TasksSection";

type Inputs = {
  country: CountryEnum;
  industry: string;
};

const schema = z.object({
  country: z.nativeEnum(CountryEnum),
  industry: z.string().min(1),
});

const Blueprints = () => {
  const methods = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      industry: "",
    },
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const values = watch();

  return (
    <div className="p-4 space-y-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl">Blueprints</h2>
        <p>
          You are now on the first and only full service global expansion
          platform
        </p>
      </div>
      <FormProvider {...methods}>
        <div className="grid grid-cols-12 gap-4 grow overflow-hidden">
          <div className="shadow-sm bg-slate-100 col-span-8 space-y-6 p-6 overflow-hidden flex flex-col">
            <p className="font-bold">
              Select the area you are interested in to better understand
              requirements
            </p>
            {!values.country && <CountriesSelect />}
            {values.country && !values.industry && <IndustriesSelect />}
            {values.country && values.industry && (
              <div className="h-full grow grid grid-rows-2">
                <LeadsSection />
                <TasksSection />
              </div>
            )}
          </div>
          <div className="shadow-md col-span-4 m-2 p-4">
            <BlueprintsStepper />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default Blueprints;
