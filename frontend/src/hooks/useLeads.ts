import { ListLeadsQuery, useListLeadsQuery } from "@/graphql/generated";

type PropsType = {
  skip?: boolean;
  onCompleted?: (leads: ListLeadsQuery["leads"]) => void;
};

const useLeads = ({ skip, onCompleted }: PropsType = {}) => {
  const { data, loading, refetch } = useListLeadsQuery({
    onCompleted: data => {
      onCompleted?.(data.leads);
    },
    skip,
  });
  const leads = data?.leads;

  console.log(leads);

  return {
    leads,
    loading,
    refetch,
  };
};

export default useLeads;
