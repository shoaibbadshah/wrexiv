"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CountryEnum, useGenerateArticlesMutation } from "@/graphql/generated";
import CountrySelectInput from "../molecules/CountrySelectInput";
import useFlash from "@/hooks/useFlash";

type Inputs = {
  description: string;
  countries: CountryEnum[];
};

const schema = z.object({
  description: z.string().min(1),
  countries: z.array(z.nativeEnum(CountryEnum)),
});

type PropsType = {
  open: boolean;
  handleClose: () => void;
  handleAfterSave: () => void;
};

const ArticlesGenerateFormDialog = ({
  open,
  handleClose,
  handleAfterSave,
}: PropsType) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      countries: [],
    },
  });

  const [generateArticles, { loading }] = useGenerateArticlesMutation();
  const { showMessage } = useFlash();

  const onSubmit: SubmitHandler<Inputs> = input => {
    console.log(input);
    // handleAfterSave();
    generateArticles({
      variables: {
        input,
      },
      onCompleted: () => {
        showMessage("Articles generated", "success");
        handleAfterSave();
      },
    });
  };

  console.log(loading);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { minWidth: 600 },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Generate Articles</DialogTitle>
        <DialogContent>
          <Controller
            name="description"
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextField
                label="Description"
                value={value}
                variant="outlined"
                margin="dense"
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(error)}
                helperText={errors.description?.message}
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="countries"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CountrySelectInput
                values={value || []}
                onChange={newValue => onChange(newValue)}
                label="Countries"
                placeholder="Select one or more countries"
                errorMessage={error?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <div className="mx-4 my-2">
            <button type="submit" className="btn btn-primary">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ArticlesGenerateFormDialog;
