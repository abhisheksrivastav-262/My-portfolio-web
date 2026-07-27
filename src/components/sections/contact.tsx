"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Mail, Phone, MessageCircle, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    type: "Single Page Website",
    budget: "₹299 Starter",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSending(true);
    try {
      if (supabase) {
        const { error } = await supabase.from("messages").insert([{
          name: formData.name,
          email: formData.email,
          message: `[Phone: ${formData.phone || "N/A"}] [Business: ${formData.business || "N/A"}] [Type: ${formData.type}] [Budget: ${formData.budget}]\n\n${formData.message}`,
          read: false
        }]);
        if (error) throw error;
      }
      setSent(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        business: "",
        type: "Single Page Website",
        budget: "₹299 Starter",
        message: ""
      });
    } catch (err: any) {
      alert(err.message || "Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-border bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Headings matching Let's Start Your Project screenshot structure */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card backdrop-blur-md mb-6"
          >
            <span className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Contact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 text-foreground tracking-tight"
          >
            Let's Start Your Project
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Reach out and we'll respond within a few hours. No commitments.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Columns - Contact Cards & Offer Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Get in Touch card */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-black text-foreground mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+918140353442"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/50 hover:bg-muted transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FaPhone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground/90 font-bold text-sm">+91 8140353442</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:abhitechnologies262@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/50 hover:bg-muted transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FaEnvelope className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground/90 font-bold text-xs truncate">abhitechnologies262@gmail.com</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918140353442"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <FaWhatsapp className="w-4 h-4" />
                  </div>
                  <span className="text-foreground/90 font-bold text-sm">Chat on WhatsApp</span>
                </a>
              </div>
            </GlassCard>

            {/* Limited Time Offer Card - Starting from ₹299 */}
            <GlassCard className="p-6 text-center border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full filter blur-xl pointer-events-none" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Limited Time Offer</p>
              <h4 className="text-3xl font-black text-primary font-mono mb-1">₹299 Website</h4>
              <p className="text-xs text-foreground/80 font-medium">+ 1 Year FREE Hosting Included</p>
            </GlassCard>

            {/* Right Side Info Features card list */}
            <GlassCard className="p-6 space-y-4">
              <h4 className="text-sm font-bold text-foreground/90 uppercase tracking-wider border-b border-border pb-2">Why Work With Us</h4>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Fast 24-48 Hours Delivery</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>Mobile Responsive Designs</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <span>SEO Optimization Standard</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>1 Year FREE Hosting & Domain Setup</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                  <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>Lifetime support & assistance</span>
                </li>
              </ul>
            </GlassCard>
          </div>

          {/* Right Columns - Form Panel matching screenshot */}
          <div className="lg:col-span-8">
            <GlassCard className="p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-2xl">
                    ✅
                  </div>
                  <h3 className="text-2xl font-black text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within a few hours.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-6 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/30 transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-foreground/80 uppercase">Name *</label>
                    <input
                      id="name" required type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-foreground/80 uppercase">Email *</label>
                      <input
                        id="email" required type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-foreground/80 uppercase">Phone</label>
                      <input
                        id="phone" type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="business" className="text-xs font-bold text-foreground/80 uppercase">Business Name</label>
                    <input
                      id="business" type="text"
                      placeholder="Your business name"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Project Type & Budget Tiers dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="type" className="text-xs font-bold text-foreground/80 uppercase">Website Type</label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-all"
                      >
                        <option value="Single Page Website">Single Page Website</option>
                        <option value="Business Website">Business Website</option>
                        <option value="Portfolio Website">Portfolio Website</option>
                        <option value="E-Commerce Website">E-Commerce Website</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Custom Web Development">Custom Web Development</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="text-xs font-bold text-foreground/80 uppercase">Budget</label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-all"
                      >
                        <option value="₹299 Starter">₹299 Plan</option>
                        <option value="₹1,000 - ₹5,000">₹1,000 - ₹5,000</option>
                        <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                        <option value="₹10,000+">₹10,000+ Custom</option>
                      </select>
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-foreground/80 uppercase">Description / Message *</label>
                    <textarea
                      id="message" required rows={4}
                      placeholder="Tell us about your project or business needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-black text-sm hover:opacity-95 transition-opacity"
                  >
                    {isSending ? "Sending..." : "Get My Website →"}
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Google Map Placeholder Section at bottom */}
        <div className="max-w-6xl mx-auto mt-20">
          <GlassCard className="p-4 overflow-hidden rounded-3xl border border-border shadow-md">
            <div className="w-full h-80 bg-muted/60 flex flex-col items-center justify-center text-center gap-2 border border-dashed border-border rounded-2xl">
              <span className="text-3xl">📍</span>
              <h4 className="font-bold text-foreground">Google Map Location</h4>
              <p className="text-muted-foreground text-xs max-w-xs leading-relaxed">
                Silvassa, Dadra and Nagar Haveli and Daman and Diu, India. Google Maps embed code widget will appear here.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
