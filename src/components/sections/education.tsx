"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Education
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary mb-2 tracking-widest uppercase">
                  2023 - 2026
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Bachelor of Computer Applications (BCA)</h3>
                <h4 className="text-xl text-white/60 mb-6">Sharda University</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Focusing on advanced computer science principles, full-stack development, database architecture and modern web technologies. Actively participating in tech clubs, hackathons, and building real-world projects while maintaining strong academic performance.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
