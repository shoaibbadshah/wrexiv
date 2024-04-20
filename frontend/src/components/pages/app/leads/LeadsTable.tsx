"use client";

import LoadingRings from "@/components/atoms/LoadingRings";
import useLeadsTable from "@/hooks/useLeadsTable";
import { Avatar, Dialog, DialogActions } from "@mui/material";
import {
  DataGridPro,
  GridRowSelectionModel,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import Link from "next/link";
import { useState } from "react";
import EmailsDialog from "./EmailsDialog";
import { useDispatch } from "react-redux";
import { setSelectedLeadIds } from "@/store/leadsSlice";
import MessageDialog from "./MessageDialog";

const LeadsTable = () => {
  const [selectedCompanyUrl, setSelectedCompanyUrl] = useState<
    string | undefined
  >(undefined);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>(
    undefined
  );
  const dispatch = useDispatch();

  const apiRef = useGridApiRef();

  const { columns, rows, loading } = useLeadsTable({
    renderAvatar: avatar => {
      return <Avatar key={avatar} alt="Travis Howard" src={avatar} />;
    },
    renderCheckbox: id => {
      return (
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={rowSelectionModel.includes(id)}
            onChange={e => {
              if (e.target.checked) {
                setRowSelectionModel([...rowSelectionModel, id]);
                dispatch(
                  setSelectedLeadIds(
                    [...rowSelectionModel, id].map(id => id.toString())
                  )
                );
              } else {
                setRowSelectionModel(
                  rowSelectionModel.filter(model => model !== id)
                );
                dispatch(
                  setSelectedLeadIds(
                    rowSelectionModel
                      .filter(model => model !== id)
                      .map(id => id.toString())
                  )
                );
              }
            }}
          />
        </label>
      );
    },
    renderActions(lead) {
      return (
        <div className="flex space-x-2">
          {lead.linkedinUrl ? (
            <Link href={lead.linkedinUrl} target="_blank">
              <button className="btn btn-xs btn-primary">Profile</button>
            </Link>
          ) : (
            <button className="btn btn-xs btn-error" disabled>
              Profile
            </button>
          )}
          {lead.organization?.website ? (
            <button
              className="btn btn-xs btn-primary"
              onClick={() => {
                if (lead.organization?.website) {
                  setSelectedCompanyUrl(lead.organization?.website);
                }
              }}
            >
              Emails
            </button>
          ) : (
            <button className="btn btn-xs btn-error" disabled>
              Emails
            </button>
          )}
          <button
            className="btn btn-xs btn-primary"
            onClick={e => {
              e.stopPropagation();
              setSelectedLeadId(lead.id);
            }}
          >
            Message
          </button>
          {false && <button className="btn btn-xs btn-error">Delete</button>}
        </div>
      );
    },
  });

  if (loading) return <LoadingRings />;

  return (
    <div className="grow h-full">
      <DataGridPro
        apiRef={apiRef}
        columns={columns}
        rows={rows}
        initialState={{
          pinnedColumns: {
            right: ["actions"],
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={newRowSelectionModel => {
          setRowSelectionModel(newRowSelectionModel);
          console.log(newRowSelectionModel);
          dispatch(
            setSelectedLeadIds(newRowSelectionModel.map(id => id.toString()))
          );
        }}
        rowSelectionModel={rowSelectionModel}
      />
      {selectedCompanyUrl && (
        <EmailsDialog
          open={!!selectedCompanyUrl}
          onClose={() => setSelectedCompanyUrl(undefined)}
          organizationUrl={selectedCompanyUrl || ""}
        />
      )}
      {selectedLeadId && (
        <MessageDialog
          leadId={selectedLeadId}
          handleClose={() => setSelectedLeadId(undefined)}
        />
      )}
    </div>
  );
};

export default LeadsTable;
