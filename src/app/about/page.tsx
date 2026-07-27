import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AboutSection } from "@/components/sections/about";
import { MissionSection } from "@/components/sections/mission";

const TimelineSection = dynamic(() => import("@/components/sections/timeline").then(mod => mod.TimelineSection));
const SkillsSection = dynamic(() => import("@/components/sections/skills").then(mod => mod.SkillsSection));
const CTASection = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTASection));

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />

      <div className="flex-1 w-full flex flex-col">
        <AboutSection />
      </div>
    </main>
  );
}
