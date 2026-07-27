"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import {
  Globe2, Briefcase, User, Coffee, GraduationCap, Activity,
  Heart, Home, ShoppingCart, LayoutTemplate, Paintbrush, Code2
} from "lucide-react";

const services = [
  {
    icon: Globe2,
    title: "Single Page Website",
    description: "Fast, mobile-friendly landing page delivered in 24–48 hours. Perfect for businesses, freelancers and personal brands. Starting at just ₹299."
  },
  {
    icon: Briefcase,
    title: "Business Website",
    description: "Professional multi-page business websites with modern design, contact forms, SEO optimization and all essential business features."
  },
  {
    icon: User,
    title: "Portfolio Website",
    description: "Stunning personal portfolio websites for freelancers, designers, developers and creative professionals to showcase their work."
  },
  {
    icon: Coffee,
    title: "Restaurant Website",
    description: "Beautiful restaurant and café websites with menus, online order forms, reservation booking, gallery and contact details."
  },
  {
    icon: GraduationCap,
    title: "School Website",
    description: "Professional websites for schools, colleges and educational institutes with admissions, notices, gallery and event sections."
  },
  {
    icon: Activity,
    title: "Gym Website",
    description: "High-energy gym and fitness centre websites with membership plans, class schedules, trainer profiles and contact booking."
  },
  {
    icon: Heart,
    title: "Hospital & Clinic Website",
    description: "Trust-building hospital and clinic websites with doctor profiles, appointment booking forms, services and contact information."
  },
  {
    icon: Home,
    title: "Real Estate Website",
    description: "Property listing websites with search filters, property galleries, agent profiles, inquiry forms and location maps."
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    description: "Feature-rich online stores with product management, payment gateways, cart system and a seamless shopping experience."
  },
  {
    icon: LayoutTemplate,
    title: "Landing Page",
    description: "High-converting marketing landing pages optimized for leads, sales and campaign promotions. Fast and action-focused."
  },
  {
    icon: Paintbrush,
    title: "Website Redesign",
    description: "Transform your outdated website into a modern, fast and visually stunning site with improved UX, design and performance."
  },
  {
    icon: Code2,
    title: "Custom Web Development",
    description: "Scalable custom web applications, admin dashboards, SaaS platforms and robust backend systems built with modern technologies."
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
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Complete web development solutions for every type of business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <GlassCard key={idx} delay={idx * 0.06} hoverEffect={true} className="p-8 flex flex-col group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                {service.description}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors group/link"
              >
                Get Started
                <span className="translate-x-0 group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
