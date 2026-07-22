"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Discovery & Strategy",
    description: "Understanding the problem, defining goals, and outlining the technical architecture before writing a single line of code."
  },
  {
    icon: PenTool,
    title: "2. UI/UX Design",
    description: "Crafting wireframes and high-fidelity prototypes to ensure a seamless and engaging user experience."
  },
  {
    icon: Code,
    title: "3. Development",
    description: "Building robust, scalable solutions using modern tech stacks, adhering to best practices and clean code principles."
  },
  {
    icon: Rocket,
    title: "4. Deployment & Scaling",
    description: "Deploying to production with CI/CD pipelines, optimizing performance, and ensuring high availability."
  }
];

export function ProcessSection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#030303]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            My Development Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A systematic approach to transforming complex problems into elegant digital solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 flex flex-col items-start h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
