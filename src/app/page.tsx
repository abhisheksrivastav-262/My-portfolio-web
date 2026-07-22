import dynamic from 'next/dynamic';
import { HeroSection } from "@/components/sections/hero";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// Lazy load below the fold components
const AboutSection = dynamic(() => import("@/components/sections/about").then(mod => mod.AboutSection));
const ProjectsSection = dynamic(() => import("@/components/sections/projects").then(mod => mod.ProjectsSection));
const CTASection = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTASection));

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      
      <div className="flex-1 w-full flex flex-col pt-16">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CTASection />
      </div>
    </main>
  );
}
