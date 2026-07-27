"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";

const PLANS = [
  {
    name: "Starter",
    subtitle: "Perfect for getting online fast",
    price: "₹299",
    priceNote: "One-time payment",
    badge: "🔥 Best Seller",
    badgeColor: "bg-primary/20 border-primary/40 text-primary",
    glow: "rgba(139,92,246,0.25)",
    features: [
      "1 Page Responsive Design",
      "Mobile Optimized",
      "Contact Form",
      "Basic SEO Setup",
      "Social Media Integration",
      "1 Year FREE Hosting",
      "1 Year FREE SSL Certificate",
      "Free Domain Setup Support",
      "WhatsApp Chat Button",
      "Google Maps Integration",
      "Fast Loading Website",
      "Free Minor Revisions",
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: true
  },
  {
    name: "Business",
    subtitle: "For growing businesses",
    price: "Custom",
    priceNote: "Tailored to your needs",
    badge: "⭐ Popular Choice",
    badgeColor: "bg-secondary/20 border-secondary/40 text-secondary",
    glow: "rgba(6,182,212,0.2)",
    features: [
      "Multi-Page Website (5-10 Pages)",
      "Custom Design & Branding",
      "Advanced SEO Optimization",
      "Blog / News Section",
      "Admin Panel",
      "Contact & Inquiry Forms",
      "Google Analytics Integration",
      "Performance Optimization",
      "1 Year FREE Hosting & SSL",
      "3 Months Free Maintenance",
      "WhatsApp Integration",
      "Priority Support",
    ],
    cta: "Get Quote",
    href: "/contact",
    highlighted: false
  },
  {
    name: "Premium",
    subtitle: "Full custom enterprise solution",
    price: "Custom",
    priceNote: "Enterprise-grade quality",
    badge: "💎 Enterprise",
    badgeColor: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400",
    glow: "rgba(234,179,8,0.15)",
    features: [
      "E-Commerce / Full Web Application",
      "Custom Backend Development",
      "Advanced Admin Dashboard",
      "Payment Gateway Integration",
      "User Authentication & Accounts",
      "Database Design & Management",
      "API Integration",
      "Unlimited Pages",
      "Free Domain + Hosting (1 Year)",
      "Dedicated Technical Support",
      "6 Months Free Maintenance",
      "Performance & Security Audit",
    ],
    cta: "Get Quote",
    href: "/contact",
    highlighted: false
  }
];

export function PricingFullSection() {
  return (
    <section id="pricing" className="py-32 relative z-10 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.07),transparent_60%)] pointer-events-none" />

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
            No hidden fees. No surprises. Pick a plan or contact us for a custom quote.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-[2rem] border backdrop-blur-xl p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? "border-primary/40 bg-primary/5 shadow-[0_0_50px_rgba(139,92,246,0.2)]"
                  : "border-border bg-card"
              }`}
            >
              {/* Glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full filter blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${plan.glow} 0%, transparent 70%)` }}
              />

              {/* Badge */}
              <div className={`inline-flex items-center self-start px-3 py-1.5 rounded-full border text-xs font-black mb-6 ${plan.badgeColor}`}>
                {plan.badge}
              </div>

              {/* Header */}
              <h3 className="text-2xl font-black text-foreground mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{plan.subtitle}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-black text-foreground">{plan.price}</span>
                <p className="text-muted-foreground text-xs mt-1">{plan.priceNote}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlighted ? "bg-primary/20 border border-primary/40" : "bg-muted border border-border"}`}>
                      <Check className={`w-2.5 h-2.5 ${plan.highlighted ? "text-primary" : "text-foreground"}`} />
                    </div>
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <MagneticButton>
                <a
                  href={plan.href}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-base transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                      : "bg-muted border border-border text-foreground hover:bg-muted/80"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {plan.cta}
                </a>
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-sm mb-4">Have questions? Chat with us directly.</p>
          <a
            href="https://wa.me/918140353442"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-bold text-sm hover:bg-[#25D366]/30 transition-all"
          >
            💬 WhatsApp: +91 8140353442
          </a>
        </motion.div>
      </div>
    </section>
  );
}
