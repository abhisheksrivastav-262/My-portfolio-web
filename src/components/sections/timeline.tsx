"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2022",
    title: "The Beginning",
    description: "Started learning web development — HTML, CSS, JavaScript. Built the first projects and fell in love with creating things for the web.",
    highlight: "🌱 Self-taught journey begins"
  },
  {
    year: "2023",
    title: "First Client",
    description: "Landed the first real client and built a business website as a freelancer. Discovered the power of helping businesses grow online.",
    highlight: "🤝 First paid project delivered"
  },
  {
    year: "2024",
    title: "Founded Abhi Technologies",
    description: "Officially founded Abhi Technologies with a mission to deliver premium websites at affordable prices for businesses of all sizes.",
    highlight: "🚀 Agency officially launched"
  },
  {
    year: "2025",
    title: "Growing Fast",
    description: "Crossed 50+ website deliveries. Expanded services to include e-commerce, admin dashboards, custom web applications and portfolio websites.",
    highlight: "📈 50+ websites delivered"
  },
  {
    year: "2026",
    title: "100+ Projects",
    description: "Delivered 100+ premium websites and web applications. Built a reputation for fast delivery, premium design and exceptional client satisfaction.",
    highlight: "🏆 100+ happy clients"
  }
];

export function TimelineSection() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            From a curious learner to founding Abhi Technologies.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-10">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content card */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black tracking-wider">
                        {m.year}
                      </span>
                      <span className="text-xs text-muted-foreground">{m.highlight}</span>
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {m.description}
                    </p>
                  </motion.div>
                </div>

                {/* Dot */}
                <div className="hidden md:flex flex-col items-center justify-center relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 + 0.2, type: "spring" }}
                    className="w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_rgba(139,92,246,0.7)] border-2 border-background"
                  />
                </div>

                {/* Empty side */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
