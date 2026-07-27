import dynamic from 'next/dynamic';
import { HeroSection } from "@/components/sections/hero";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// Lazy load below the fold components
const StatsSection = dynamic(() => import("@/components/sections/stats").then(mod => mod.StatsSection));
const ServicesSection = dynamic(() => import("@/components/sections/services").then(mod => mod.ServicesSection));
const AboutSection = dynamic(() => import("@/components/sections/about").then(mod => mod.AboutSection));
const PricingSection = dynamic(() => import("@/components/sections/pricing").then(mod => mod.PricingSection));
const ProjectsSection = dynamic(() => import("@/components/sections/projects").then(mod => mod.ProjectsSection));
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.TestimonialsSection));
const WhyMeSection = dynamic(() => import("@/components/sections/why-me").then(mod => mod.WhyMeSection));
const CTASection = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTASection));

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden">
      <CustomCursor />
      <ScrollProgress />

      <div className="flex-1 w-full flex flex-col pt-16">
        <HeroSection />
        <StatsSection />
      </div>
    </main>
  );
}
