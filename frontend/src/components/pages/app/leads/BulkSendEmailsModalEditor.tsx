"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/molecules/formInputs/TextField";
import TextareaField from "@/components/molecules/formInputs/TextareaField";

const BulkSendEmailsModalEditor = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <TextField id="subject" label="Subject" register={register} type="text" />
      <TextareaField id="body" label="Body" register={register} rows={6} />
    </div>
  );
};

export default BulkSendEmailsModalEditor;
