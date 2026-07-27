import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const ContactSection = dynamic(() => import("@/components/sections/contact").then(mod => mod.ContactSection));
const SocialsSection = dynamic(() => import("@/components/sections/socials").then(mod => mod.SocialsSection));

export const metadata = {
  title: "Contact Us — Abhi Technologies",
  description: "Get in touch with Abhi Technologies for professional, fast, and affordable web development services.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />
      
      <div className="flex-1 w-full flex flex-col">
        <ContactSection />
        <SocialsSection />
        
        {/* Map Section */}
        <section className="py-16 bg-[#020202] relative z-10 border-t border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Location</h3>
            <div className="w-full h-96 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative">
              <iframe
                title="Abhi Technologies Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14787.971206103632!2d73.0039234!3d20.2757239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cb8bbfbbd813%3A0xe54efb5ef60de327!2sSilvassa%2C%20Dadra%20and%20Nagar%20Haveli%20and%20Daman%20and%20Diu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0 filter invert-[90%] hue-rotate-[180deg]"
                allowFullScreen={true}
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
