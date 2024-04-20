import HeroSection from "./HeroSection";
import WhoWeAre from "./WhoWeAre";
import CaseStudy from "./CaseStudy";
import ProcessSection from "./ProcessSection";
import CTASection from "./CTASection";

// import BlogSection from "./BlogSection";
// import MembersSection from "./MembersSection";
// import AchivementsSection from "./AchivementsSection";
// import ServicesSection from "./ServicesSection";
// import CTASection from "./CTASection";
// import ProductSection from "./ProductSection";
// import Footer from "./Footer";

type PropsType = {};

export default async function Portfolio({}: PropsType) {
  return (
    <div className="pt-16">
      <HeroSection />
      <div>
        <WhoWeAre />
        <CaseStudy />
        <ProcessSection />
        {/* <AchivementsSection />
        <BlogSection /> */}
        <CTASection />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
