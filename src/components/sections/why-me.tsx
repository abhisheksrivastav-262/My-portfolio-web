"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Zap, Heart, Target, Coffee } from "lucide-react";

export function WhyMeSection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Why Work With Me
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {[
            { icon: Zap, title: "Fast Execution", desc: "I prioritize velocity without compromising on code quality or architecture." },
            { icon: Target, title: "Detail Oriented", desc: "Pixel-perfect designs, smooth animations, and zero-error deployments." },
            { icon: Heart, title: "Passionate", desc: "I treat every project as if it were my own startup, ensuring maximum dedication." }
          ].map((item, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
              <Coffee className="w-64 h-64 text-white" />
            </div>
            <h3 className="text-3xl font-black text-white mb-6">Fun Facts</h3>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                I write code better after midnight.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                I have a streak of 100+ days on LeetCode.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                I am a huge fan of minimal, brutalist design aesthetics.
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
