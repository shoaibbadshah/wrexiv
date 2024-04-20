import { Tool as ToolType } from "@/contentful/tool";
import Tool from "./Tool";

type FinderSingleToolType = {
  tool: ToolType;
};
const FinderSingleTool = ({ tool }: FinderSingleToolType) => {
  return (
    <div className="mx-auto w-fit mt-12">
      <Tool tool={tool} />
    </div>
  );
};

export default FinderSingleTool;
