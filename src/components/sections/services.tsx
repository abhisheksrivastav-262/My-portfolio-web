"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Code2, Cpu, Globe2, Palette } from "lucide-react";

const services = [
  {
    icon: Globe2,
    title: "Full Stack Development",
    description: "End-to-end web application development using modern frameworks like Next.js, React, and Node.js. Architecting scalable solutions from database to the user interface."
  },
  {
    icon: Palette,
    title: "Frontend Engineering",
    description: "Creating highly interactive, accessible, and pixel-perfect user interfaces with advanced animations using Framer Motion and Tailwind CSS."
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Integrating powerful artificial intelligence capabilities into web applications, leveraging modern AI APIs to build smart, context-aware products."
  },
  {
    icon: Code2,
    title: "System Architecture",
    description: "Designing robust backend architectures, APIs, and microservices focusing on high availability, security, and exceptional performance."
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            What I Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Delivering comprehensive technical solutions tailored to drive business success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
