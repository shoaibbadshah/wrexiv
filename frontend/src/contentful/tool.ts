import { TypeToolSkeleton } from "./types";
import { Entry } from "contentful";
import client from "@/lib/contentful";

type ToolEntry = Entry<TypeToolSkeleton, undefined, string>;

// default to type. https://blog.logrocket.com/types-vs-interfaces-typescript/
export type Tool = {
  name: string;
  url: string;
  id: string;
};

function parseContentfulTool(toolEntry: ToolEntry): Tool {
  return {
    name: toolEntry.fields.name || "",
    url: toolEntry.fields.url || "",
    id: toolEntry.sys.id,
  };
}
// GET single
type fetchSingleToolOptions = {
  id: string;
};

export async function fetchSingleTool(
  options: fetchSingleToolOptions
): Promise<Tool | null> {
  let datum;
  try {
    datum = await client.getEntry<TypeToolSkeleton>(options.id);
  } catch (e) {
    return null;
  }

  return parseContentfulTool(datum);
}

export async function fetchTools(): Promise<Tool[]> {
  const toolsResult = await client.getEntries<TypeToolSkeleton>({
    content_type: "tool",
    include: 2,
    order: ["-sys.createdAt"],
  });

  return toolsResult.items.map(toolEntry => parseContentfulTool(toolEntry));
}
