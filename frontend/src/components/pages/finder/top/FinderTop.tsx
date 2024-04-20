import { Tool } from "@/contentful/tool";
import HeroSection from "./HeroSection";
import FinderArticles from "../articles/FinderArticles";
import FinderExperts from "../experts/FinderExperts";
import FinderTools from "../tools/FinderTools";
import { Expert } from "@/contentful/expert";
import { BlogPost } from "@/contentful/blogPost";

type PropsType = {
  tools: Tool[];
  articles: BlogPost[];
  experts: Expert[];
};

export default function FinderTop({ tools, articles, experts }: PropsType) {
  return (
    <div className="pb-56 w-full">
      <HeroSection />
      <div className="space-y-20 max-w-3xl mx-auto">
        <FinderArticles articles={articles} />
        <FinderExperts experts={experts} />
        <FinderTools tools={tools} />
      </div>
    </div>
  );
}
