"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../ui/magnetic-button";

export function CTASection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-primary overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight leading-tight">
            Ready to bring your ideas to life?
          </h2>
          <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
            Let's collaborate and build something extraordinary together. I'm currently available for freelance projects and open to full-time opportunities.
          </p>
          
          <MagneticButton>
            <a 
              href="#contact" 
              className="inline-block px-10 py-5 rounded-full bg-white text-primary font-black text-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              Start a Project
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
