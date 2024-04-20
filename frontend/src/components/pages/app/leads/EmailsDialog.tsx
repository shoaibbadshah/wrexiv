"use client";

import LoadingDialog from "@/components/molecules/LoadingDialog";
import { useListCompanyContactsQuery } from "@/graphql/generated";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

type PropsType = {
  open: boolean;
  onClose: () => void;
  organizationUrl: string;
};

const EmailsDialog = ({ open, onClose, organizationUrl }: PropsType) => {
  const { data, loading } = useListCompanyContactsQuery({
    variables: { companyUrl: organizationUrl },
  });
  const contacts = data?.companyContacts;

  if (loading) return <LoadingDialog />;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Contacts</DialogTitle>
      <DialogContent>
        {contacts && contacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Accuracy</th>
                  <th>Sources</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => {
                  return (
                    <tr key={contact.email}>
                      <th>{contact.name}</th>
                      <td>{contact.email}</td>
                      <td>{contact.accuracy}</td>
                      <td>{contact.sources.join(", ")}</td>
                      <td>
                        <button className="btn btn-primary btn-sm">
                          Auto Sales
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No emails found</div>
        )}
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <button className="btn btn-primary" onClick={onClose}>
          Send Email
        </button>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailsDialog;
