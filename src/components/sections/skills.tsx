"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

const skillCategories = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript / JavaScript", level: 90 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Tailwind CSS", level: 95 }
    ]
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js / Express.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "Git / GitHub", level: 90 }
    ]
  },
  {
    category: "DevOps & Deployment",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Vercel / Netlify", level: 90 },
      { name: "Supabase / PostgreSQL", level: 85 },
      { name: "Performance Optimization", level: 88 }
    ]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative z-10 border-t border-white/5 bg-[#030303]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Technical Arsenal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Technologies, frameworks, and methodologies I leverage daily to ship high-performance products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((categoryGroup, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8">
              <h3 className="text-2xl font-black mb-8 text-foreground">{categoryGroup.category}</h3>
              <div className="space-y-6">
                {categoryGroup.skills.map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-foreground/90 group-hover:text-primary transition-colors text-sm">{item.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{item.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.05), ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
