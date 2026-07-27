"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import {
  Globe2, Briefcase, User, Coffee, GraduationCap, Activity,
  Heart, Home, ShoppingCart, LayoutTemplate, Paintbrush, Code2,
  CheckCircle2, Clock, ShieldCheck
} from "lucide-react";

interface ServiceItem {
  icon: any;
  title: string;
  price: string;
  badge?: string;
  badgeColor?: string;
  delivery: string;
  deliveryType: string;
  description: string;
  features: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    icon: Globe2,
    title: "Single Page Website",
    price: "₹299",
    badge: "🔥 Best Seller",
    badgeColor: "bg-primary/20 border-primary/40 text-primary",
    delivery: "24-48 Hours",
    deliveryType: "Full Delivery",
    description: "Fast, mobile-friendly landing page delivered in 24–48 hours. Perfect for startups, local businesses, and personal brands.",
    features: ["1 Page Responsive Design", "Mobile Optimized", "Contact Form", "Basic SEO", "1 Year Free Hosting", "Social Media Links"]
  },
  {
    icon: Briefcase,
    title: "Business Website",
    price: "₹4,999+",
    badge: "Most Popular",
    badgeColor: "bg-secondary/20 border-secondary/40 text-secondary",
    delivery: "5-7 Days",
    deliveryType: "Full Delivery",
    description: "Professional multi-page business websites with custom design, contact forms, advanced SEO, and all essential features.",
    features: ["Multi-page Design (5-10 pages)", "Premium UI/UX", "Contact Forms", "Google Maps Integration", "SEO Optimization", "1 Year Hosting"]
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    price: "₹9,999+",
    badge: "Full Store",
    badgeColor: "bg-amber-500/20 border-amber-500/40 text-amber-500",
    delivery: "7-14 Days",
    deliveryType: "Full Delivery",
    description: "Feature-rich online store platforms with clean inventory, secure checkout steps, admin panels, and payment integrations.",
    features: ["Product Catalog", "Payment Gateway", "Order Management", "Inventory System", "Customer Dashboard", "Admin Panel"]
  },
  {
    icon: Code2,
    title: "Custom Web Development",
    price: "Custom Pricing",
    badge: "Enterprise",
    badgeColor: "bg-purple-500/20 border-purple-500/40 text-purple-500",
    delivery: "2-4 Weeks",
    deliveryType: "Full Delivery",
    description: "Highly scalable custom web systems, SaaS platforms, dashboard panels, and robust backend systems tailored to your workflows.",
    features: ["Custom Web Applications", "API Integrations", "Database Design", "User Authentication", "Admin Dashboard", "Scalable Architecture"]
  },
  {
    icon: User,
    title: "Portfolio Website",
    price: "₹1,999+",
    delivery: "3-5 Days",
    deliveryType: "Full Delivery",
    description: "Stunning personal portfolio layouts for creatives, freelancers, and professionals to build a standout digital brand.",
    features: ["Custom Bio Page", "Work Gallery", "Contact Integrations", "Resume Downloader", "Responsive UI", "Social Links"]
  },
  {
    icon: Coffee,
    title: "Restaurant Website",
    price: "₹2,999+",
    delivery: "3-5 Days",
    deliveryType: "Full Delivery",
    description: "Visually delicious restaurant layouts complete with digital food menus, reservations systems, and direct WhatsApp ordering.",
    features: ["Digital Food Menu", "Reservation Booking", "WhatsApp Order System", "Map Integration", "Image Gallery", "Open Hours Display"]
  },
  {
    icon: GraduationCap,
    title: "School Website",
    price: "₹4,999+",
    delivery: "5-7 Days",
    deliveryType: "Full Delivery",
    description: "Comprehensive informational platforms for schools, colleges, and training institutes with event notices and galleries.",
    features: ["Admissions Details", "Student Notice Board", "Events Calendar", "Photo Gallery", "Contact Forms", "Faculty Profiles"]
  },
  {
    icon: Activity,
    title: "Gym Website",
    price: "₹2,499+",
    delivery: "3-5 Days",
    deliveryType: "Full Delivery",
    description: "High-energy gym and training center websites highlighting memberships, training programs, schedules, and instructor cards.",
    features: ["Membership Tiers", "Class Schedules", "Trainer Profiles", "Inquiry Forms", "Responsive UI", "WhatsApp Integration"]
  },
  {
    icon: Heart,
    title: "Hospital & Clinic Website",
    price: "₹3,999+",
    delivery: "4-6 Days",
    deliveryType: "Full Delivery",
    description: "Trustworthy online presence for clinics, dentists, and hospitals featuring online doctor appointment requests.",
    features: ["Doctor Appointment Form", "Department Listings", "Services Directory", "Patient Reviews", "Map Location", "Emergency Contact info"]
  },
  {
    icon: Home,
    title: "Real Estate Website",
    price: "₹5,999+",
    delivery: "5-8 Days",
    deliveryType: "Full Delivery",
    description: "Interactive real estate databases containing listing details, property filter forms, maps, and direct inquiry routing.",
    features: ["Property Listings", "Search Filters", "Inquiry Forms", "Location Maps", "High-res Galleries", "Agent Profiles"]
  },
  {
    icon: LayoutTemplate,
    title: "Landing Page",
    price: "₹999+",
    delivery: "24-48 Hours",
    deliveryType: "Full Delivery",
    description: "High-converting marketing landing pages optimized for maximum lead captures, newsletters, or single service highlights.",
    features: ["Lead Capture Form", "Conversion Optimized", "Call To Actions", "Fast Load Speed", "Mobile Responsive", "Social Proof section"]
  },
  {
    icon: Paintbrush,
    title: "Website Redesign",
    price: "Custom",
    delivery: "3-5 Days",
    deliveryType: "Optimization",
    description: "Rebuild your outdated website with premium HSL themes, lightweight asset loading, search optimizations, and responsive layouts.",
    features: ["Modern Design", "Performance Upgrade", "SEO Optimizations", "Mobile Responsive Fix", "Code Cleanups", "UX Flow Enhancements"]
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-32 relative z-10 border-t border-border bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Headings */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card backdrop-blur-md mb-6"
          >
            <span className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Our Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 text-foreground tracking-tight leading-none"
          >
            Digital Solutions That Drive Results
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Choose the perfect solution for your business. Every project is built with premium quality and attention to detail.
          </motion.p>
        </div>

        {/* 2-Column Grid matching reference image layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard hoverEffect={true} className="p-8 h-full flex flex-col justify-between group relative overflow-hidden">
                <div>
                  {/* Top card header: Icon, title, badges, price */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      {/* Title & Badge */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                          {service.badge && (
                            <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${service.badgeColor}`}>
                              {service.badge}
                            </span>
                          )}
                        </div>

                        {/* Delivery Time info row */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {service.delivery}
                          </span>
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {service.deliveryType}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price tag */}
                    <div className="text-right sm:text-right self-start sm:self-auto">
                      <span className="text-2xl font-black text-primary font-mono">{service.price}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature lists - 2 column layout matching reference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-foreground/80 text-xs font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="w-full">
                  <a
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-black text-sm hover:opacity-95 transition-opacity duration-300"
                  >
                    Get Started →
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
