"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";

const FEATURES = [
  "1 Responsive Landing Page",
  "Mobile Friendly Design",
  "Contact Form",
  "Basic SEO Setup",
  "Social Media Integration",
  "1 Year FREE Hosting",
  "1 Year FREE SSL Certificate",
  "Free Domain Setup Support",
  "WhatsApp Chat Button",
  "Google Maps Integration",
  "Fast Loading Website",
  "Premium Modern Design",
  "Free Minor Revisions",
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            No hidden fees. No surprises. Just premium quality at an unbeatable price.
          </motion.p>
        </div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2rem] bg-card border border-border backdrop-blur-xl p-10 shadow-2xl overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 filter blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary/10 filter blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-foreground mb-2">Single Page Website</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    24–48 Hours Full Delivery
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-black uppercase tracking-wider">
                    🔥 Best Seller
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-10">
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black text-foreground">₹299</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">One-time payment • No hidden charges</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {FEATURES.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground/80 text-sm font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <MagneticButton>
                <a
                  href="/contact"
                  id="pricing-cta"
                  className="w-full flex items-center justify-center py-4 rounded-2xl bg-primary text-white font-black text-lg hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300"
                >
                  Get Your Website Now →
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
