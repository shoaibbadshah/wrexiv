import { useForm } from "react-hook-form";
import TextareaField from "../molecules/formInputs/TextareaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomField from "../molecules/formInputs/CustomField";
import { CountryDropdown } from "react-country-region-selector";
import { CountryEnum } from "@/graphql/generated";

type PropsType = {
  handleSubmit: () => void;
};

type FormValues = Readonly<{
  description: string;
  country: CountryEnum;
}>;

const schema = z.object({
  description: z.string().min(1),
  country: z.nativeEnum(CountryEnum),
});

const AssetGenerateForm = ({ handleSubmit }: PropsType) => {
  const {
    reset,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
    },
  });

  const country = watch("country");

  return (
    <div>
      <form className="space-y-8">
        <div className="space-y-3">
          <TextareaField
            id="what"
            label="What do you want to sell?"
            register={register}
          />
          <TextareaField
            id="what"
            label="Your target audience?"
            register={register}
          />
          <CustomField
            label="Target Country"
            field={
              <CountryDropdown
                classes="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={country}
                onChange={val => setValue("country", val as CountryEnum)}
              />
            }
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetGenerateForm;
