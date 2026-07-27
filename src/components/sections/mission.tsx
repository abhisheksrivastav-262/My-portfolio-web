"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Target, Eye } from "lucide-react";

export function MissionSection() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Our Mission & Vision
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <GlassCard delay={0} className="p-10 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/10 filter blur-xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To deliver <span className="text-white font-semibold">premium, modern websites</span> at
              affordable prices — empowering every startup, local business and entrepreneur to build
              a powerful online presence without breaking the bank.
            </p>
            <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-primary font-bold italic">
                "Premium websites at affordable prices."
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={0.1} className="p-10 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-secondary/10 filter blur-xl pointer-events-none group-hover:bg-secondary/20 transition-all duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To become the most trusted web development agency in India — empowering
              <span className="text-white font-semibold"> every business</span> with a world-class
              online presence, exceptional performance and lasting digital growth.
            </p>
            <div className="mt-8 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
              <p className="text-secondary font-bold italic">
                "Empowering every business with a world-class online presence."
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
