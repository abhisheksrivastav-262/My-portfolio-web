"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { GlassCard } from "../ui/glass-card";

const certifications = [
  {
    title: "Full Stack Open",
    issuer: "University of Helsinki",
    date: "2023",
    description: "Deep dive into modern web development focusing on React, Redux, Node.js, MongoDB, GraphQL and TypeScript."
  }
];

export function CertificationsSection() {
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
            Licenses & Certifications
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-2 tracking-widest uppercase">
                {cert.date}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{cert.title}</h3>
              <p className="text-sm text-white/50 mb-1">{cert.issuer}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
