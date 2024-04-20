import CaseStudies from "@/components/pages/caseStudies/CaseStudies";
import { fetchCaseStudies } from "@/contentful/caseStudy";
import { notFound } from "next/navigation";
import { caseStudies } from "@/constants/caseStudy";
import { TypeKindValue } from "@/contentful/types";

interface CaseStudiesPageParams {
  kind: TypeKindValue;
}

interface CaseStudiesPageProps {
  params: CaseStudiesPageParams;
}

export default async function CaseStudiesPage({
  params,
}: CaseStudiesPageProps) {
  if (!caseStudies.kind.includes(params.kind)) {
    return notFound();
  }

  const caseStudiesResult = await fetchCaseStudies({
    preview: false,
    kind: params.kind,
  });

  return <CaseStudies caseStudies={caseStudiesResult} />;
}
