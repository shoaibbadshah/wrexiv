import HeroSection from "./HeroSection";
import CaseStudySection from "./CaseStudySection";
import CTASection from "./CTASection";

type PropsType = {};

export default async function CaseStudy({}: PropsType) {
  return (
    <div className="pt-16">
      <HeroSection />
      <div className="space-y-12">
        <CaseStudySection />
        <CTASection />
      </div>
    </div>
  );
}
