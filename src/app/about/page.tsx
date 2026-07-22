import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";

const ToolsSection = dynamic(() => import("@/components/sections/tools").then(mod => mod.ToolsSection));
const WhyMeSection = dynamic(() => import("@/components/sections/why-me").then(mod => mod.WhyMeSection));

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />
      
      <div className="flex-1 w-full flex flex-col">
        <AboutSection />
        <SkillsSection />
        <ToolsSection />
        <WhyMeSection />
      </div>
    </main>
  );
}
