"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
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
          message: `[Phone: ${formData.phone || "N/A"}] [Business: ${formData.business || "N/A"}]\n\n${formData.message}`,
          read: false
        }]);
        if (error) throw error;
      }
      setSent(true);
      setFormData({ name: "", phone: "", email: "", business: "", message: "" });
    } catch (err: any) {
      alert(err.message || "Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10 border-t border-border bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.07),transparent_55%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-4"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto"
            >
              Tell us about your project and we'll get back to you within a few hours.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <GlassCard className="p-8 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-3">Let's build your website.</h3>
                <p className="text-muted-foreground mb-8">
                  Reach out via any of the channels below. We respond quickly!
                </p>

                <div className="space-y-3">
                  {/* Phone */}
                  <a
                    href="tel:+918140353442"
                    className="w-full flex items-center gap-3 py-4 px-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">Call Us</p>
                      <p className="text-white font-semibold group-hover:text-primary transition-colors">+91 8140353442</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918140353442"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 py-4 px-4 rounded-xl border border-[#25D366]/30 hover:bg-[#25D366]/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0">
                      <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-white font-semibold group-hover:text-[#25D366] transition-colors">+91 8140353442</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:abhitechnologies262@gmail.com"
                    className="w-full flex items-center gap-3 py-4 px-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">Email</p>
                      <p className="text-white font-semibold group-hover:text-primary transition-colors text-xs">abhitechnologies262@gmail.com</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="w-full flex items-center gap-3 py-4 px-4 rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">Location</p>
                      <p className="text-white font-semibold text-sm">Silvassa, D&NH, India</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <GlassCard className="p-8 md:p-10" hoverEffect={false}>
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you within a few hours.</p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-4 px-6 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/30 transition-all"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Name + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-foreground/80">
                          Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="name" required type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-foreground/80">Phone</label>
                        <input
                          id="phone" type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                          placeholder="+91 00000 00000"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email + Business Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-foreground/80">
                          Email <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email" required type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="business" className="text-sm font-semibold text-foreground/80">Business Name</label>
                        <input
                          id="business" type="text"
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                          placeholder="Your Business Name"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-foreground/80">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message" required rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                        placeholder="Tell us about your project, budget, and timeline..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-black text-lg hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                      {isSending ? "Sending..." : "Send Message →"}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      We respond within a few hours. You can also chat on{" "}
                      <a href="https://wa.me/918140353442" className="text-[#25D366] hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                    </p>
                  </form>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
