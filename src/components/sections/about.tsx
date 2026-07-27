"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

export function AboutSection() {
  return (
    <section id="about" className="py-32 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">Meet the <br />Founder</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground font-semibold">Abhishek Srivastav</span> is a{" "}
                <span className="text-foreground font-semibold">Full Stack Web Developer</span> specializing in
                modern websites, business websites, portfolio websites, e-commerce websites, admin dashboards
                and scalable web applications.
              </p>
              <p>
                His mission is to help startups, businesses and entrepreneurs build premium online experiences
                with modern technologies and affordable pricing — starting from just ₹299.
              </p>
              <p>
                With over 2 years of experience delivering 100+ projects, Abhishek is committed to
                pixel-perfect design, fast performance and exceptional client satisfaction.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-10 p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <p className="text-foreground/90 italic text-lg font-medium leading-relaxed">
                "Great websites don't just look beautiful — they help businesses grow."
              </p>
              <p className="text-primary text-sm font-bold mt-3 uppercase tracking-widest">
                — Abhishek Srivastav, Founder
              </p>
            </div>

            <div className="mt-12 flex gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border">
                <h4 className="font-bold text-foreground text-2xl mb-1">Founder</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Abhi Technologies</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border">
                <h4 className="font-bold text-foreground text-2xl mb-1">2+ Yrs</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Experience</p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center items-center">
            {/* 3D Profile Photo Glass Frame */}
            <GlassCard
              tilt3d={true}
              hoverEffect={true}
              className="relative w-80 h-96 p-4 rounded-[2rem] overflow-hidden"
            >
              {/* Profile Image */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src="/logo.png"
                  alt="Abhi Technologies Logo"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = "0";
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) parent.classList.add("bg-gradient-to-br", "from-primary/20", "to-secondary/20");
                  }}
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
