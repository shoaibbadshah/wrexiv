"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useFlash from "@/hooks/useFlash";
import { useGenerateLeadsMutation } from "@/graphql/generated";
import useLeads from "@/hooks/useLeads";
import TextareaField from "@/components/molecules/formInputs/TextareaField";
import TextField from "@/components/molecules/formInputs/TextField";

type FormValues = Readonly<{
  subject: string;
  content: string;
}>;

const schema = z.object({
  subject: z.string().min(1),
  content: z.string().min(1),
});

const Editor = () => {
  const {
    reset,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p>Your Language</p>
        <div>
          <TextField id="subject" label="Subject" register={register} />
        </div>
        <div>
          <TextareaField id="content" label="Content" register={register} />
        </div>
      </div>
      <div className="divider" />
      <div className="space-y-4">
        <p>Their Language</p>
        <div>
          <TextField id="subject" label="Subject" register={register} />
        </div>
        <div>
          <TextareaField id="content" label="Content" register={register} />
        </div>
      </div>
      <div className="flex justify-between">
        <select>
          <option>Email Adress</option>
          <option>Linkedin</option>
        </select>
        <div className="space-x-2">
          <button className="btn">Generate</button>
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
