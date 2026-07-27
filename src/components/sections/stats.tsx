"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

const STATS = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Premium Websites" },
  { value: "2+", label: "Years Experience" },
  { value: "100+", label: "Happy Clients" },
];

export function StatsSection() {
  return (
    <section id="stats" className="py-24 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {STATS.map((stat, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 text-center flex flex-col items-center justify-center">
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                className="text-4xl md:text-5xl font-black text-gradient mb-2"
              >
                {stat.value}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                className="text-sm text-muted-foreground uppercase tracking-widest font-semibold"
              >
                {stat.label}
              </motion.p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
