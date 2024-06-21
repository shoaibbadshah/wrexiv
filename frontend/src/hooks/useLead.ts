import { useGetLeadQuery } from "@/graphql/generated";

type PropsType = {
  leadId: string;
};

const useLead = ({ leadId }: PropsType) => {
  const { data, loading, refetch } = useGetLeadQuery({
    variables: {
      id: leadId,
    },
  });
  const lead = data?.lead;
  return { lead, loading, refetch };
};

export default useLead;
