"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../ui/magnetic-button";

export function CTASection() {
  return (
    <section className="py-32 relative z-10 border-t border-border bg-card overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-foreground tracking-tight leading-tight">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
            Professional websites starting from just ₹299.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton>
              <a
                href="/contact"
                className="inline-block px-10 py-5 rounded-full bg-foreground text-background font-black text-xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/contact"
                className="inline-block px-10 py-5 rounded-full bg-muted border border-border text-foreground font-black text-xl hover:scale-105 hover:bg-muted/80 transition-all duration-300"
              >
                Contact Now
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
