import CTASection from "./CTASection";
import CustomerVoice from "./CustomerVoice";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import FlowSection from "./FlowSection";
import HeroSection from "./HeroSection";
import MentorsSection from "./MentorsSection";
import PriceSection from "./PriceSection";
import WhoWeAreSection from "./WhoWeAreSection";

export default function MarketingAutomation() {
  return (
    <div className="bg-white">
      <main className="isolate">
        <HeroSection />
        <div className="space-y-36 mb-20">
          <WhoWeAreSection />
          <FeaturesSection />
          <CustomerVoice />
          <FlowSection />
          <PriceSection />
          <MentorsSection />
          <CTASection />
        </div>
      </main>
    </div>
  );
}
