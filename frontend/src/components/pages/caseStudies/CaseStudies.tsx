import HeroSection from "./HeroSection";
import CaseStudiesSection from "./CaseStudiesSection";
import CTASection from "./CTASection";

import { CaseStudy } from "@/contentful/caseStudy";

type PropsType = {
  caseStudies: CaseStudy[];
};

export default async function CaseStudies({ caseStudies }: PropsType) {
  return (
    <div className="pt-24">
      <HeroSection />
      <div className="space-y-12">
        <CaseStudiesSection caseStudies={caseStudies} />
        <CTASection />
      </div>
    </div>
  );
}
