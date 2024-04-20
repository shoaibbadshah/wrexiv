import FinderSingleTool from "@/components/pages/finder/tools/FinderSingleTool";
import { fetchSingleTool } from "@/contentful/tool";
import { notFound } from "next/navigation";

type FinderSingleToolPageType = {
  params: {
    id: string;
  };
};
export default async function FinderSingleToolPage(
  props: FinderSingleToolPageType
) {
  const { id } = props.params;
  const tool = await fetchSingleTool({ id });

  if (!tool) {
    return notFound();
  }
  return <FinderSingleTool tool={tool} />;
}
