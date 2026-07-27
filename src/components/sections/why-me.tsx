"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import {
  DollarSign, Zap, Sparkles, Search, Smartphone, Gauge,
  Server, HeadphonesIcon, GraduationCap
} from "lucide-react";

const TOP_THREE = [
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Premium websites at unbeatable prices in the market. Professional quality starting from just ₹299.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Your website delivered within 24–48 hours. Quick turnaround without ever compromising quality.",
  },
  {
    icon: Sparkles,
    title: "Premium Design",
    desc: "Stunning, modern designs that wow visitors instantly. Every website is crafted with pixel-perfect precision.",
  },
];

const GRID_REASONS = [
  { icon: Search, label: "SEO Friendly" },
  { icon: Smartphone, label: "Mobile Responsive" },
  { icon: Gauge, label: "Fast Loading" },
  { icon: Server, label: "1 Year Free Hosting" },
  { icon: HeadphonesIcon, label: "24×7 Support" },
  { icon: GraduationCap, label: "Lifetime Guidance" },
];

export function WhyMeSection() {
  return (
    <section className="py-32 relative z-10 border-t border-border bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            9 reasons why businesses trust Abhi Technologies.
          </motion.p>
        </div>

        {/* Top 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {TOP_THREE.map((item, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* 6 icon grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {GRID_REASONS.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 flex flex-col items-center gap-3 text-center cursor-default transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground/80">{reason.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
