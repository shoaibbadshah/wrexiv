import CaseStudies from "@/components/pages/caseStudies/CaseStudies";
import { fetchCaseStudies } from "@/contentful/caseStudy";

export default async function CaseStudiesPage() {
  const caseStudiesResult = await fetchCaseStudies({ preview: false });

  return <CaseStudies caseStudies={caseStudiesResult} />;
}
