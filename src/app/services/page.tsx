import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ServicesSection } from "@/components/sections/services";

const WhyMeSection = dynamic(() => import("@/components/sections/why-me").then(mod => mod.WhyMeSection));
const PricingSection = dynamic(() => import("@/components/sections/pricing").then(mod => mod.PricingSection));
const CTASection = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTASection));

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />

      <div className="flex-1 w-full flex flex-col">
        <ServicesSection />
      </div>
    </main>
  );
}
