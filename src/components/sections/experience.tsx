"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

const experiences = [
  {
    role: "Founder & Full Stack Web Developer",
    company: "Abhi Technologies",
    period: "2024 - Present",
    description: "Founded Abhi Technologies to deliver premium websites and web applications to businesses, startups and entrepreneurs. Delivered 100+ projects including business websites, e-commerce stores, portfolio websites, admin dashboards and custom web applications.",
  },
  {
    role: "Full Stack Web Developer",
    company: "Freelance / Independent",
    period: "2023 - 2024",
    description: "Designed and built responsive, modern websites and web applications for clients. Focused on delivering pixel-perfect UI/UX, fast performance and clean code.",
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative z-10 border-t border-white/5 bg-[#030303]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Journey & Experience
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1" />

                <div className="hidden md:flex flex-col items-center justify-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-4 h-4 rounded-full bg-primary relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  />
                </div>

                <div className="flex-1">
                  <GlassCard delay={idx * 0.1} className="p-8 relative">
                    <div className={`absolute top-8 w-4 h-4 bg-card border-t border-r border-border rotate-45 hidden md:block ${idx % 2 === 0 ? "-left-2 -rotate-[135deg] border-t-0 border-r-0 border-b border-l" : "-right-2"}`} />

                    <div className="text-sm font-bold text-primary mb-2 tracking-widest uppercase">
                      {exp.period}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                    <h4 className="text-lg text-muted-foreground mb-4">{exp.company}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
