"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { BookOpen, Cpu, Globe } from "lucide-react";

export function LearningSection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#030303]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Continuous Learning
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Technology evolves rapidly. Here is what I am currently exploring and what is next on my radar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <GlassCard className="p-8 border-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white">Currently Mastering</h3>
            </div>
            <ul className="space-y-4">
              {[
                { title: "WebGL & Three.js", desc: "Building immersive 3D experiences directly in the browser." },
                { title: "Advanced System Design", desc: "Architecting scalable distributed systems for millions of users." },
                { title: "WebAssembly (Rust)", desc: "Integrating high-performance native code into web applications." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>

          <div className="flex flex-col gap-8">
            <GlassCard className="p-8 flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Next Up</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Go (Golang)", "GraphQL Federation", "Machine Learning (PyTorch)", "WebRTC", "Docker Swarm"].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-8">
              <div className="flex items-center gap-4">
                <Globe className="w-8 h-8 text-primary" />
                <p className="text-white/80 font-medium">
                  "The day you stop learning is the day you stop growing."
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
