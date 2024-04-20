import { useListLeadContactsQuery } from "@/graphql/generated";

const useLeadContacts = (selectedLeadIds: string[]) => {
  const { data, loading } = useListLeadContactsQuery({
    variables: { leadIds: selectedLeadIds },
    skip: !selectedLeadIds || selectedLeadIds.length === 0,
  });

  const contacts = data?.leadContacts;

  return { contacts, loading };
};

export default useLeadContacts;
