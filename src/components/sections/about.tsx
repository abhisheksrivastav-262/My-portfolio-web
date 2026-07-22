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
            <h2 className="text-4xl md:text-6xl font-black mb-6">The Journey <br/>Behind the Code</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a dedicated **AI Full Stack Web Developer** currently pursuing my **Bachelor of Computer Applications (BCA)** in my **Second Year (Fourth Semester)** at **Sharda University**. I specialize in engineering modern, responsive, and highly scalable web applications.
              </p>
              <p>
                My development workflow combines the speed of state-of-the-art AI design and code generation tools with rigorous manual programming, testing, and debugging. This hybrid approach allows me to build high-performance products at an accelerated velocity while maintaining clean, pixel-perfect UI/UX standards.
              </p>
              <p>
                I am deeply committed to performance optimization, responsive design, and continuous learning, always seeking to master new paradigms and technologies to solve real-world challenges through elegant software solutions.
              </p>
            </div>
            <div className="mt-12 flex gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white text-2xl mb-1">4th Sem</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">BCA Student</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white text-2xl mb-1">Sharda</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">University</p>
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
                  src="/profile.jpg"
                  alt="Abhishek Srivastav"
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
