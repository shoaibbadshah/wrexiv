import Description from "../_ui/Description";
import Heading from "../_ui/Heading";
import Tool from "./Tool";

import { Tool as ToolType } from "@/contentful/tool";

type FinderToolsProps = {
  tools: ToolType[];
};
const FinderTools = ({ tools }: FinderToolsProps) => {
  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <Heading level={2} link="/finder/tools">
        Tools
      </Heading>
      <Description>
        Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus eos
        totam in dolorum. Nemo vel facere repellendus ut eos dolores similique.
      </Description>

      <ul className="space-y-2 mt-12">
        {tools.map(tool => (
          <li key={tool.id}>
            <Tool tool={tool} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinderTools;
