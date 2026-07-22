"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content: "Abhishek delivered our project ahead of schedule with flawless execution. His attention to detail in animations and responsive design completely transformed our brand's online presence.",
    author: "Sarah Jenkins",
    role: "CTO, TechVision Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    content: "An exceptional developer who understands both the technical architecture and the user experience. The performance optimizations he implemented resulted in a 40% increase in our conversion rate.",
    author: "David Chen",
    role: "Founder, StartupX",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    content: "Working with Abhishek was a breeze. He communicated clearly, adapted quickly to our changing requirements, and delivered code that was clean, scalable, and highly maintainable.",
    author: "Elena Rodriguez",
    role: "Product Manager, InnovateCo",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Client Feedback
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Don't just take my word for it. Here is what people I've worked with have to say.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 flex flex-col justify-between h-full">
              <div>
                <Quote className="w-10 h-10 text-primary/40 mb-6" />
                <p className="text-lg text-white/90 leading-relaxed mb-8 italic">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="font-bold text-white">{t.author}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
