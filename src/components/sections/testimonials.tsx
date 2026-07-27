"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    content: "Abhi Technologies built our restaurant website in just 2 days. The quality is amazing and our online orders increased by 40%! Absolutely worth every rupee.",
    author: "Rajesh Patel",
    role: "Restaurant Owner",
    city: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    initials: "RP"
  },
  {
    content: "I couldn't believe the quality at ₹299. My boutique's e-commerce store looks premium and works flawlessly on mobile. My sales doubled within the first month!",
    author: "Priya Sharma",
    role: "Boutique Owner",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    initials: "PS"
  },
  {
    content: "Professional, fast, and affordable. Abhishek delivered our startup's website exactly as we envisioned. The animations and design are world-class.",
    author: "Amit Verma",
    role: "Startup Founder",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    initials: "AV"
  },
  {
    content: "Got my clinic website built quickly and patients love it. The contact form works perfectly and the mobile design is clean. Highly recommended!",
    author: "Sneha Gupta",
    role: "Clinic Owner",
    city: "Jaipur",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    initials: "SG"
  },
  {
    content: "Our online store went live quickly and everything works perfectly. The website is fast, secure, and the checkout process is smooth. Great experience overall!",
    author: "Vikram Singh",
    role: "E-commerce Seller",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    initials: "VS"
  },
  {
    content: "My portfolio website looks world-class. Clients are impressed the moment they visit. Abhishek's attention to detail and design sense is truly exceptional.",
    author: "Nisha Reddy",
    role: "Freelancer",
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    initials: "NR"
  }
];

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
};

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const t = testimonials[current];

  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.07),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            What Our Clients Say
          </motion.p>
        </div>

        <div
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className="relative overflow-hidden min-h-[320px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full"
              >
                <div className="rounded-[2rem] bg-card border border-border backdrop-blur-xl p-10 md:p-14 relative overflow-hidden">
                  <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-primary/5 filter blur-2xl pointer-events-none" />
                  <Quote className="w-12 h-12 text-primary/30 mb-6" />
                  <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed italic mb-10 font-medium">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.author}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div>
                      <h4 className="font-black text-foreground text-lg">{t.author}</h4>
                      <p className="text-muted-foreground text-sm">
                        {t.role} • <span className="text-primary font-medium">{t.city}</span>
                      </p>
                    </div>
                    {/* Star rating */}
                    <div className="ml-auto flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === current
                      ? "w-8 h-2.5 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.6)]"
                      : "w-2.5 h-2.5 bg-muted hover:bg-muted/80"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
