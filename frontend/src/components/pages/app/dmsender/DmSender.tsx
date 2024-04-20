"use client";

import LeadGenerateForm from "@/components/forms/LeadGenerateForm";
import LeadsNavigation from "@/components/organisms/LeadsNavigation";
import { useListLeadsLazyQuery } from "@/graphql/generated";
import useLeads from "@/hooks/useLeads";
import { useState } from "react";
import DirectMessageNavigator from "@/components/organisms/directMessageNavigator/DirectMessageNavigator";

const DmSender = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const { leads } = useLeads({
    onCompleted: leads => {
      if (leads && leads.length === 0) {
        setIsGenerateModalOpen(true);
      }
    },
  });

  const lead = leads?.[0];

  return (
    <div className="h-full flex flex-col px-8 py-4 space-y-4">
      <DirectMessageNavigator leadId={lead?.id} />
    </div>
  );
};

export default DmSender;
