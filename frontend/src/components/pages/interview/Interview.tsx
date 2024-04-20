import CTASection from "./CTASection";
import CaseStudiesSection from "./CaseStudiesSection";
import CompetitorsSection from "./CompetitorsSection";
import CustomerVoice from "./CustomerVoice";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import FlowSection from "./FlowSection";
import HeroSection from "./HeroSection";
import ImageSection from "./ImageSection";
import MentorsSection from "./MentorsSection";
import MissionSection from "./MissionSection";
import PriceSection from "./PriceSection";
import TargetSection from "./TargetSection";
import ValuesSection from "./ValuesSection";
import WhoWeAreSection from "./WhoWeAreSection";

export default function Interview() {
  return (
    <div className="bg-white">
      <main className="isolate">
        <HeroSection />
        <div className="space-y-48 mb-20">
          <WhoWeAreSection />
          {false && <MissionSection />}
          <FeaturesSection />
          <TargetSection />
          <CustomerVoice />
          <FlowSection />
          <PriceSection />
          <CompetitorsSection />
          {false && <CaseStudiesSection />}
          {false && <ImageSection />}
          {false && <ValuesSection />}
          <MentorsSection />
          <FAQSection />
          <CTASection />
        </div>
      </main>
    </div>
  );
}
