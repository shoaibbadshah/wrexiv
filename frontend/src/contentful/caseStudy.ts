import { TypeKindValue, TypeCaseStudySkeleton } from "./types";
import { Entry } from "contentful";
import client from "@/lib/contentful";
import { ContentImage, parseContentfulContentImage } from "./contentImage";

type CaseStudyEntry = Entry<TypeCaseStudySkeleton, undefined, string>;

export interface CaseStudy {
  title: string;
  topic: string;
  kind: string;
  image: ContentImage | null;
  slug: string | null;
}

export function parseContentfulCaseStudy(
  caseStudyEntry?: CaseStudyEntry
): CaseStudy | null {
  if (!caseStudyEntry) {
    return null;
  }

  return {
    title: caseStudyEntry.fields.title,
    topic: caseStudyEntry.fields.topic,
    kind: caseStudyEntry.fields.kind,
    image: parseContentfulContentImage(caseStudyEntry.fields.image) || null,
    slug: caseStudyEntry.fields.slug || null,
  };
}

interface FetchCaseStudiesOptions {
  kind?: TypeKindValue;
  preview?: boolean;
}

export async function fetchCaseStudies({
  kind,
  preview,
}: FetchCaseStudiesOptions): Promise<CaseStudy[]> {
  const caseStudyResult = await client.getEntries<TypeCaseStudySkeleton>({
    content_type: "caseStudy",
    include: 2,
    order: ["-sys.createdAt"],
    limit: 6,
    "fields.kind": kind,
  });

  return caseStudyResult.items.map(
    caseStudyEntry => parseContentfulCaseStudy(caseStudyEntry) as CaseStudy
  );
}
