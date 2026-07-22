"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { ExternalLink, Code2 } from "lucide-react";

const profiles = [
  {
    name: "LeetCode",
    username: "abhisheksrivastav",
    stats: { solved: "300+", rank: "Top 5%" },
    link: "https://leetcode.com",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  {
    name: "HackerRank",
    username: "@abhishek_s",
    stats: { badges: "5 Gold", score: "2500+" },
    link: "https://hackerrank.com",
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    name: "CodeChef",
    username: "abhi_code",
    stats: { rating: "1850", stars: "4★" },
    link: "https://codechef.com",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  }
];

export function CodingProfilesSection() {
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
            Competitive Programming
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Sharpening my problem-solving skills across various competitive coding platforms.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {profiles.map((profile, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="p-8 group">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${profile.bg}`}>
                  <Code2 className={`w-7 h-7 ${profile.color}`} />
                </div>
                <a 
                  href={profile.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-1 text-white">{profile.name}</h3>
              <p className="text-muted-foreground mb-8 font-mono">{profile.username}</p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                {Object.entries(profile.stats).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{key}</p>
                    <p className="text-lg font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
