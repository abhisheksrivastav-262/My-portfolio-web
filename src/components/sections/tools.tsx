"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { Laptop, Monitor, Terminal, Database } from "lucide-react";

export function ToolsSection() {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Tools I Use
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            My setup for maximum productivity and developer happiness.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <Laptop className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">Hardware</h3>
            </div>
            <div className="space-y-6">
              {[
                { name: "MacBook Pro M2", desc: "Primary daily driver for all development." },
                { name: "27\" 4K Monitor", desc: "Dual setup for maximum screen real estate." },
                { name: "Mechanical Keyboard", desc: "Custom built with tactile switches." }
              ].map((item, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-bold text-white text-lg">{item.name}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <Terminal className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">Software</h3>
            </div>
            <div className="space-y-6">
              {[
                { name: "VS Code & Cursor", desc: "IDEs of choice, loaded with AI plugins." },
                { name: "Figma", desc: "For UI/UX design and prototyping." },
                { name: "Arc Browser", desc: "For distraction-free web development." },
                { name: "Warp Terminal", desc: "Rust-based, blazing fast terminal." }
              ].map((item, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-bold text-white text-lg">{item.name}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
