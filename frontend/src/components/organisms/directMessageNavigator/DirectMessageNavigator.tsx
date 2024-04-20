"use client";

import LeadGenerateForm from "@/components/forms/LeadGenerateForm";
import LeadsNavigation from "@/components/organisms/LeadsNavigation";
import { ListLeadsQuery, useListLeadsLazyQuery } from "@/graphql/generated";
import useLeads from "@/hooks/useLeads";
import { useState } from "react";
import LeadProfile from "./LeadProfile";
import Editor from "./Editor";
import useLead from "@/hooks/useLead";

type PropsType = {
  leadId: string;
};

const DirectMessageNavigator = ({ leadId }: PropsType) => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const { lead } = useLead({ leadId });

  return (
    <div className="h-full flex flex-col px-8 py-4 space-y-4">
      <div className="h-full grid grid-cols-2 gap-8 p-3">
        {lead ? (
          <div className="h-full overflow-y-auto">
            <LeadProfile lead={lead} />
          </div>
        ) : (
          <div>loading</div>
        )}
        <div>
          <Editor />
        </div>
      </div>
      {isGenerateModalOpen && (
        <LeadGenerateForm
          open={isGenerateModalOpen}
          onClose={() => setIsGenerateModalOpen(false)}
          handleAfterSave={() => setIsGenerateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DirectMessageNavigator;
