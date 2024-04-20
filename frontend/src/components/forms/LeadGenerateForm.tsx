import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useFlash from "@/hooks/useFlash";
import { useGenerateLeadsMutation } from "@/graphql/generated";
import TextField from "../molecules/formInputs/TextField";
import useLeads from "@/hooks/useLeads";
import LoadingDialog from "../molecules/LoadingDialog";

type PropsType = {
  open: boolean;
  onClose: () => void;
  handleAfterSave: () => void;
};

type FormValues = Readonly<{
  description: string;
}>;

const schema = z.object({
  description: z.string().min(1),
});

const LeadGenerateForm = ({ open, onClose, handleAfterSave }: PropsType) => {
  const {
    reset,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
    },
  });
  const { showMessage } = useFlash();

  const { refetch } = useLeads();
  const [generateLeads, { loading }] = useGenerateLeadsMutation();

  const onSubmit = handleSubmit(async params => {
    generateLeads({
      variables: {
        input: {
          description: params.description,
        },
      },
      onCompleted: () => {
        refetch();
        handleAfterSave();
      },
    });
  });

  if (loading) return <LoadingDialog />;

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: 500 } }}>
      <form onSubmit={onSubmit}>
        <DialogTitle>Generate Leads</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ py: 4 }}>
            <TextField
              id="description"
              label="What kind of leads are you looking for?"
              type="text"
              register={register}
              error={errors.description?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" type="submit">
            Generate
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LeadGenerateForm;
