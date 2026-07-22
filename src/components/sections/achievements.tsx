"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Trophy, Star, Award } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Hackathon Winner",
    description: "First place in National Level CodeFest 2024 for building an innovative AI-driven educational platform."
  },
  {
    icon: Star,
    title: "Open Source Contributor",
    description: "Active contributor to major open-source frameworks, optimizing core performance modules."
  },
  {
    icon: Award,
    title: "Top Performer",
    description: "Recognized as the top developer in the cohort with exceptional problem-solving and architectural skills."
  }
];

export function AchievementsSection() {
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
            Achievements
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((item, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
