import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PricingFullSection } from "@/components/sections/pricing-full";

const CTASection = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTASection));
const WhyMeSection = dynamic(() => import("@/components/sections/why-me").then(mod => mod.WhyMeSection));

export const metadata = {
  title: "Pricing — Abhi Technologies",
  description: "Transparent website pricing starting at ₹299. Choose from Starter, Business, and Premium plans.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />

      <div className="flex-1 w-full flex flex-col">
        <PricingFullSection />
      </div>
    </main>
  );
}
