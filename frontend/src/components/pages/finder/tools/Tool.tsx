import { Tool as ToolType } from "@/contentful/tool";
import Link from "next/link";
const Tool = ({ tool }: { tool: ToolType }) => {
  return (
    <div>
      <Link href={`/finder/tools/${tool.id}`}>{tool.name}</Link>
      {", "}
      <Link
        href={`https://${tool.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        more
      </Link>
    </div>
  );
};
export default Tool;
