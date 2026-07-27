"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";

const PLANS = [
  {
    name: "Basic",
    subtitle: "Perfect for personal & small business",
    price: "₹299",
    priceSuffix: "one-time",
    features: [
      "1 Page Website",
      "Mobile Responsive",
      "Contact Form",
      "Basic SEO",
      "1 Year Free Hosting",
      "Social Media Links"
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: false
  },
  {
    name: "Standard",
    subtitle: "For growing businesses that need more",
    price: "₹2,999",
    priceSuffix: "starting",
    badge: "⭐ Most Popular",
    badgeColor: "bg-primary/25 border-primary/40 text-primary",
    features: [
      "5-10 Pages",
      "Premium UI/UX Design",
      "SEO Optimization",
      "Contact & Lead Forms",
      "Google Maps & Analytics",
      "1 Year Hosting Included"
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: true
  },
  {
    name: "Premium",
    subtitle: "Full online store with payments",
    price: "₹6,999",
    priceSuffix: "starting",
    features: [
      "Unlimited Products",
      "Payment Gateway",
      "Order Management",
      "Customer Accounts",
      "Inventory System",
      "Admin Dashboard"
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: false
  }
];

export function PricingFullSection() {
  return (
    <section id="pricing" className="py-24 relative z-10 bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Headings */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 text-foreground tracking-tight"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            No hidden fees. Choose a plan that fits your business.
          </motion.p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-20">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-3xl border p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-card ${
                plan.highlighted
                  ? "border-primary/50 ring-2 ring-primary/20 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                  : "border-border shadow-md"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black text-foreground mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-xs mb-6 leading-relaxed">{plan.subtitle}</p>

                {/* Price Display */}
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-primary font-mono">{plan.price}</span>
                  <span className="text-muted-foreground text-xs font-medium">{plan.priceSuffix}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground/80 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="w-full">
                <a
                  href={plan.href}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-muted border border-border text-foreground hover:bg-muted/80"
                  }`}
                >
                  {plan.cta} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Project CTA Bottom Panel matching reference screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto rounded-3xl border border-border bg-card p-8 text-center shadow-md relative overflow-hidden"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">Need Something Custom?</h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Custom web applications, SaaS platforms, and enterprise solutions — tailored pricing based on your requirements.
          </p>
          <div className="flex justify-center">
            <MagneticButton>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-black text-sm hover:opacity-95 transition-opacity"
              >
                Discuss Your Project →
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
