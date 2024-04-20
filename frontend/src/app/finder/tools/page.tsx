import FinderTools from "@/components/pages/finder/tools/FinderTools";
import { fetchTools } from "@/contentful/tool";
import { notFound } from "next/navigation";

const FinderTopPage = async () => {
  const tools = await fetchTools();

  return <FinderTools tools={tools} />;
};
export default FinderTopPage;
