"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Mail, MessageSquare, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields before sending.");
      return;
    }
    
    setIsSending(true);
    try {
      if (supabase) {
        const { error } = await supabase.from("messages").insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          read: false
        }]);
        if (error) throw error;
      } else {
        console.log("Supabase client not configured. Message payload:", formData);
      }
      alert("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      alert(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              Get In Touch
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-8 h-full flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-4">Let's talk business.</h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Fill out the form and choose your preferred contact method. Prefer a direct meeting?
                </p>
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-primary/50 text-primary font-bold text-lg hover:bg-primary/10 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a Call
                </a>
              </GlassCard>
            </div>

            <div className="lg:col-span-3">
              <GlassCard className="p-8 md:p-12" hoverEffect={false}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                      <input 
                        id="name"
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                      <input 
                        id="email"
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                    <textarea 
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    Send Message
                  </button>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
