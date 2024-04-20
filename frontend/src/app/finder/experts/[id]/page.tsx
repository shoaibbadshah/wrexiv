import FinderSingleExpert from "@/components/pages/finder/experts/FinderSingleExpert";
import { fetchSingleExpert } from "@/contentful/expert";
import { notFound } from "next/navigation";

type FinderSingleExpertPageType = {
  params: {
    id: string;
  };
};
export default async function FinderSingleExpertPage(
  props: FinderSingleExpertPageType
) {
  const { id } = props.params;
  const expert = await fetchSingleExpert({ id });

  if (!expert) {
    return notFound();
  }
  return <FinderSingleExpert expert={expert} />;
}
