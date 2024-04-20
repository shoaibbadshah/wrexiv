"use client";

import LoadingDialog from "@/components/molecules/LoadingDialog";
import {
  useListLeadContactsQuery,
  useSendEmailsMutation,
} from "@/graphql/generated";
import { useLeadsState } from "@/store/leadsSlice";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import BulkSendEmailsModalEditor from "./BulkSendEmailsModalEditor";
import BulkSendEmailsModalEmails from "./BulkSendEmailsModalEmails";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useFlash from "@/hooks/useFlash";

export type FormInputs = {
  emails: string[];
  subject: string;
  body: string;
};

const schema = z.object({
  emails: z.array(z.string()),
  subject: z.string(),
  body: z.string(),
});

type PropsType = {
  open: boolean;
  handleClose: () => void;
  handleAfterSave: () => void;
};

const BulkSendEmailsModal = ({
  open,
  handleClose,
  handleAfterSave,
}: PropsType) => {
  const { selectedLeadIds } = useLeadsState();
  const { showMessage } = useFlash();

  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      emails: [],
      subject: "",
      body: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const { data, loading } = useListLeadContactsQuery({
    variables: { leadIds: selectedLeadIds },
    onCompleted: data => {
      reset({
        emails: data.leadContacts?.map(contact => contact.email) || [],
      });
    },
    skip: !selectedLeadIds || selectedLeadIds.length === 0,
  });

  const contacts = data?.leadContacts;

  const [sendEmails, { loading: sendingEmails }] = useSendEmailsMutation();

  const [tab, setTab] = useState<"editor" | "emails">("editor");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue as "editor" | "emails");
  };

  const onSubmit = handleSubmit(async params => {
    sendEmails({
      variables: {
        input: params,
      },
      onCompleted: () => {
        showMessage("Emails sent");
        handleAfterSave();
        handleClose();
      },
    });
  });

  if (loading || sendingEmails) return <LoadingDialog />;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={onSubmit}>
        <DialogTitle>Sending Emails</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Mail Editor" value="editor" />
                    <Tab label="Destinations" value="emails" />
                  </TabList>
                </Box>
                <TabPanel value="editor">
                  <BulkSendEmailsModalEditor />
                </TabPanel>
                <TabPanel value="emails">
                  <BulkSendEmailsModalEmails contacts={contacts || []} />
                </TabPanel>
              </TabContext>
            </Box>
          </FormProvider>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <button className="btn btn-primary" type="submit">
            Send Email
          </button>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BulkSendEmailsModal;
