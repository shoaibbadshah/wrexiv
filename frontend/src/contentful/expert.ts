import client from "@/lib/contentful";
import { TypeExpertSkeleton } from "./types";
import { Entry } from "contentful";
import { ContentImage, parseContentfulContentImage } from "./contentImage";

export type Expert = {
  name: string;
  title: string;
  image: ContentImage | null;
  id: string;
};
type ExpertEntry = Entry<TypeExpertSkeleton, undefined, string>;

function parseContentfulExperts(expertEntry: ExpertEntry): Expert {
  console.log(expertEntry.fields);
  return {
    name: expertEntry.fields.name || "", // Ensure name is always a string and not nullable
    title: expertEntry.fields.title || "",
    image: parseContentfulContentImage(expertEntry.fields.image),
    id: expertEntry.sys.id,
  };
}

type fetchSingleExpertOptions = {
  id: string;
};

// GET a single based on ID
export async function fetchSingleExpert({
  id,
}: fetchSingleExpertOptions): Promise<Expert | null> {
  let datum;
  try {
    datum = await client.getEntry<TypeExpertSkeleton>(id);
  } catch (e) {
    return null;
  }

  return parseContentfulExperts(datum);
}

// GET multiple
export async function fetchExperts(): Promise<Expert[]> {
  const data = await client.getEntries<TypeExpertSkeleton>({
    content_type: "expert",
    include: 2,
  });

  return data.items.map(expert => parseContentfulExperts(expert));
}
