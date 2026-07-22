import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const ContactSection = dynamic(() => import("@/components/sections/contact").then(mod => mod.ContactSection));
const SocialsSection = dynamic(() => import("@/components/sections/socials").then(mod => mod.SocialsSection));
const ResumePreviewSection = dynamic(() => import("@/components/sections/resume-preview").then(mod => mod.ResumePreviewSection));

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />
      
      <div className="flex-1 w-full flex flex-col">
        <ContactSection />
        <SocialsSection />
        <ResumePreviewSection />
      </div>
    </main>
  );
}
