"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { GitPullRequest, GitCommit, GitMerge, Star } from "lucide-react";

export function GithubStatsSection() {
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
            Open Source & Stats
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            I actively contribute to the developer ecosystem. Here's a snapshot of my GitHub activity.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { icon: GitCommit, label: "Contributions", value: "1,200+" },
            { icon: GitPullRequest, label: "Pull Requests", value: "85" },
            { icon: Star, label: "Stars Earned", value: "320" },
            { icon: GitMerge, label: "Repositories", value: "45" }
          ].map((stat, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-6 text-center flex flex-col items-center justify-center">
              <stat.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-3xl font-black text-white mb-2">{stat.value}</h4>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* GitHub Graph Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl overflow-hidden"
        >
          <h3 className="text-xl font-bold text-white mb-6">Contribution Graph</h3>
          <div className="flex gap-1 opacity-50 flex-wrap">
            {/* Generating fake github squares for visual aesthetic */}
            {Array.from({ length: 364 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-[2px] ${
                  Math.random() > 0.8 ? 'bg-primary' : 
                  Math.random() > 0.6 ? 'bg-primary/60' : 
                  Math.random() > 0.4 ? 'bg-primary/30' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
