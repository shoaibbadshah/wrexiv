"use client";

import LeadRequestForm from "@/components/forms/LeadRequestForm";
import OnBoardingModal from "@/components/organisms/OnBoardingModal";
import { SAMPLE_LEADS } from "@/constants/datasets";
import useAssistantChatThreads from "@/hooks/useAssistantChatThreads";
import Image from "next/image";
import { useState } from "react";
import LeadsTable from "./LeadsTable";
import LeadGenerateForm from "@/components/forms/LeadGenerateForm";
import BulkSendEmailsModal from "./BulkSendEmailsModal";
import { setSelectedLeadIds, useLeadsState } from "@/store/leadsSlice";
import { useDispatch } from "react-redux";
import LeadsNavigation from "@/components/organisms/LeadsNavigation";

const Leads = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isOnBoardingModalOpen, setIsOnBoardingModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { threads } = useAssistantChatThreads({
    onCompleted: threads => {
      if (threads && threads.length === 0) setIsOnBoardingModalOpen(true);
    },
  });
  const onboarding = threads && threads.length === 0;

  const { selectedLeadIds } = useLeadsState();

  return (
    <div className="h-full flex flex-col px-8 py-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Leads</h3>
        {/* <LeadsNavigation /> */}
        {false && (
          <button
            className="btn btn-md btn-primary"
            onClick={() => setIsRequestModalOpen(true)}
          >
            New Request
          </button>
        )}
        <div className="space-x-2">
          <button
            className="btn btn-md btn-primary"
            onClick={() => setIsGenerateModalOpen(true)}
          >
            Generate
          </button>
          <button
            className="btn btn-md btn-primary"
            onClick={() => setIsOnBoardingModalOpen(true)}
          >
            New Request
          </button>
          <button
            className="btn btn-md btn-primary"
            onClick={() => setIsSendModalOpen(true)}
            disabled={!selectedLeadIds || selectedLeadIds.length === 0}
          >
            Send Emails
          </button>
        </div>
      </div>
      <div className="overflow-x-auto h-full">
        {!onboarding && <LeadsTable />}
        {onboarding && (
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Lead Channel</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {SAMPLE_LEADS.map(lead => {
                return (
                  <tr key={lead.id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              src={lead.avatar || "/avatar.png"}
                              alt="Avatar Tailwind CSS Component"
                              width={48}
                              height={48}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{lead.name}</div>
                          <div className="text-sm opacity-50">
                            {lead.country}, {lead.region}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {lead.organization}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {lead.title}
                      </span>
                    </td>
                    <td>{lead.channel}</td>
                    <td className="max-w-xs">{lead.description}</td>
                    <td className="text-right">
                      <button className="btn btn-sm">Contact</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      <LeadRequestForm
        open={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        handleAfterSubmit={() => console.log("submitted")}
      />
      {isOnBoardingModalOpen && (
        <OnBoardingModal
          open={isOnBoardingModalOpen}
          onClose={() => setIsOnBoardingModalOpen(false)}
        />
      )}
      {isGenerateModalOpen && (
        <LeadGenerateForm
          open={isGenerateModalOpen}
          onClose={() => setIsGenerateModalOpen(false)}
          handleAfterSave={() => setIsGenerateModalOpen(false)}
        />
      )}
      {isSendModalOpen && (
        <BulkSendEmailsModal
          open={isSendModalOpen}
          handleClose={() => setIsSendModalOpen(false)}
          handleAfterSave={() => dispatch(setSelectedLeadIds([]))}
        />
      )}
    </div>
  );
};

export default Leads;
