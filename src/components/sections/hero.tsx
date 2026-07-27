"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { GlassCard } from "../ui/glass-card";

const TYPEWRITER_TEXTS = [
  "Professional Websites",
  "Business Websites",
  "E-Commerce Websites",
  "Landing Pages",
];

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const transformX = useTransform(springX, x => typeof window !== "undefined" ? x - window.innerWidth / 2 : 0);
  const transformY = useTransform(springY, y => typeof window !== "undefined" ? y - window.innerHeight / 2 : 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentFullText = TYPEWRITER_TEXTS[textIndex];

      if (!isDeleting && charIndex < currentFullText.length) {
        setText(currentFullText.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentFullText.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else if (charIndex === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (charIndex === 0 && isDeleting) {
        setIsDeleting(false);
        setTextIndex((current) => (current + 1) % TYPEWRITER_TEXTS.length);
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Aurora / Spotlight */}
      {mounted && (
        <motion.div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-30 pointer-events-none mix-blend-screen dark:mix-blend-screen hidden md:block"
          style={{
            background: "radial-gradient(800px circle at var(--x) var(--y), rgba(139, 92, 246, 0.15), transparent 45%)",
            x: transformX,
            y: transformY,
          }}
        />
      )}

      {/* Light Mode Abstract Graphic shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden block dark:hidden">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-primary/5 filter blur-2xl" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-secondary/5 filter blur-3xl" />
      </div>

      {/* Animated noise overlay */}
      <div className="noise-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary-glow,rgba(139,92,246,0.12)),transparent_50%)] pointer-events-none" />

      {/* Floating Particles */}
      {mounted && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-foreground/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -200],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <GlassCard tilt3d={true} hoverEffect={true} className="p-8 md:p-16 max-w-4xl w-full text-center">
          {/* Premium Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full border border-border bg-card shadow-md mb-8 hover:border-primary/20 transition-all duration-300 select-none"
          >
            <img
              src="/logo.png"
              alt="Abhi Technologies Logo"
              className="w-8 h-8 object-contain shrink-0"
            />
            <div className="text-left leading-tight">
              <p className="text-sm font-black text-foreground">Abhi Technologies</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Premium Web Development Agency</p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1] min-h-[100px] md:min-h-[80px]"
          >
            Premium Websites for{" "}
            <span className="text-gradient relative inline-block">
              {text}
              <span className="absolute -right-6 top-0 animate-pulse text-foreground">|</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-6 font-medium mx-auto"
          >
            Professional websites, business websites, portfolio websites, e-commerce websites, landing pages and custom web applications built with modern technologies at affordable pricing.
          </motion.p>

          {/* Price Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 mb-12"
          >
            <span className="text-base font-bold text-foreground">🔥 Professional Website Starting at Just ₹299</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton>
              <a
                href="/contact"
                className="px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:opacity-90 transition-all flex items-center gap-2 group shadow-lg"
              >
                Get Started
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/projects"
                className="px-8 py-4 rounded-full bg-background border border-border text-foreground font-bold text-lg hover:bg-muted/50 transition-all"
              >
                View Portfolio
              </a>
            </MagneticButton>
          </motion.div>

          {/* Animated Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex gap-6 justify-center mt-12"
          >
            {[
              { icon: FaGithub, href: "https://github.com/abhisheksrivastav-262", label: "GitHub" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/abhishek-srivastav-681ab1257", label: "LinkedIn" },
              { icon: FaInstagram, href: "https://instagram.com/abhitechnologies262", label: "Instagram" },
              { icon: FaWhatsapp, href: "https://wa.me/918140353442", label: "WhatsApp" },
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -5, scale: 1.1, color: "var(--primary)" }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </GlassCard>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border-2 border-border flex justify-center p-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
