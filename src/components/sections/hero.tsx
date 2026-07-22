"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { GlassCard } from "../ui/glass-card";

const TYPEWRITER_TEXTS = [
  "Modern Web Applications",
  "Scalable Systems",
  "Beautiful Interfaces",
  "AI-Integrated Products"
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

  const transformX = useTransform(springX, x => typeof window !== 'undefined' ? x - window.innerWidth / 2 : 0);
  const transformY = useTransform(springY, y => typeof window !== 'undefined' ? y - window.innerHeight / 2 : 0);

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
          className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen hidden md:block"
          style={{
            background: "radial-gradient(800px circle at var(--x) var(--y), rgba(37, 99, 235, 0.15), transparent 45%)",
            x: transformX,
            y: transformY
          }}
        />
      )}
      
      {/* Animated noise overlay */}
      <div className="noise-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_50%)] pointer-events-none" />

      {/* Floating Particles */}
      {mounted && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: Math.random() * 0.5 + 0.1,
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Available for Work</span>
            <Sparkles className="w-4 h-4 text-secondary ml-1 animate-pulse" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1] min-h-[100px] md:min-h-[80px]"
          >
            Building{" "}
            <span className="text-gradient relative inline-block">
              {text}
              <span className="absolute -right-6 top-0 animate-pulse text-white">|</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 font-medium mx-auto"
          >
            Hi, I'm Abhishek Srivastav. An AI Full Stack Web Developer focused on crafting premium digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton>
              <a 
                href="/projects" 
                className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-all flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Explore My Work
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="/contact" 
                className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all"
              >
                Get In Touch
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
              { icon: FaGithub, href: "https://github.com/abhisheksrivastav-262" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/abhishek-srivastav-681ab1257" },
              { icon: FaGlobe, href: "https://vercel.com/abhi262" },
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -5, scale: 1.1, color: "#8B5CF6" }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
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
          className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center p-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
