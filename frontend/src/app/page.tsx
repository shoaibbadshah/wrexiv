import HeroSection from "@/components/pages/landingPage/HeroSection";
import FeatureSection from "@/components/pages/landingPage/FeatureSection";
import StatsSection from "@/components/pages/landingPage/StatsSection";
import CTASection from "@/components/pages/landingPage/CTASection";

export default function Home() {
  return (
    <div className="bg-white">
      <main className="isolate">
        <HeroSection />
        <div className="space-y-32 mb-16">
          <FeatureSection />
          <StatsSection />
          <CTASection />
        </div>
      </main>
    </div>
  );
}
