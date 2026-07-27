"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Phone, Mail, MapPin } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { MagneticButton } from "../ui/magnetic-button";
import { supabase } from "@/lib/supabase";

export function ResumePreviewSection() {
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

  useEffect(() => {
    async function fetchResume() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("resume")
          .select("file_url")
          .eq("id", "00000000-0000-0000-0000-000000000002")
          .single();

        if (error) throw error;
        if (data?.file_url) {
          setResumeUrl(data.file_url);
        }
      } catch (err) {
        // Safe fallback
      }
    }
    fetchResume();
  }, []);

  return (
    <section id="resume-preview" className="py-32 relative z-10 border-t border-white/5 bg-[#02010a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
          >
            My Resume
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
          >
            Preview my qualifications directly or download the official copy.
          </motion.p>

          <div className="flex justify-center gap-4 mb-16">
            <MagneticButton>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white font-bold transition-all text-sm"
              >
                <Eye className="w-4 h-4" />
                View Resume PDF
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={resumeUrl}
                download
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Dynamic interactive resume canvas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 backdrop-blur-2xl relative shadow-2xl overflow-hidden"
        >
          {/* Subtle Glows */}
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary/5 filter blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">ABHISHEK SRIVASTAV</h3>
              <p className="text-primary font-bold tracking-wide uppercase text-sm">Founder & Full Stack Web Developer</p>
              <p className="text-white/60 text-sm mt-1">Abhi Technologies</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a href="tel:+918140353442" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +91 8140353442
              </a>
              <a href="mailto:abhitechnologies262@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> abhitechnologies262@gmail.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Silvassa, Dadra & Nagar Haveli, India
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Professional Summary */}
            <div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide border-l-2 border-primary pl-3">Professional Summary</h4>
              <p className="text-muted-foreground leading-relaxed">
                Founder of Abhi Technologies and a dedicated Full Stack Web Developer with 2+ years of experience delivering 100+ premium websites and web applications. Specialized in business websites, e-commerce stores, portfolio websites, admin dashboards and custom web applications. Committed to delivering modern designs, fast performance and exceptional client satisfaction at affordable pricing.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-wide border-l-2 border-primary pl-3">Professional Experience</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-white text-lg">Founder & Full Stack Web Developer</h5>
                    <span className="text-sm font-bold text-primary">2024 – Present</span>
                  </div>
                  <h6 className="text-white/60 font-semibold mb-3">Abhi Technologies</h6>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm pl-2">
                    <li>Founded and scaled Abhi Technologies delivering 100+ premium websites.</li>
                    <li>Built responsive business websites, e-commerce stores and custom web applications.</li>
                    <li>Developed admin dashboards, landing pages and SaaS platforms for clients.</li>
                    <li>Implemented SEO optimization, performance tuning and mobile-first design.</li>
                    <li>Provided lifetime technical support and website maintenance services.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-wide border-l-2 border-primary pl-3">Education</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h5 className="font-bold text-white text-base">Bachelor of Computer Applications (BCA)</h5>
                    <p className="text-muted-foreground text-sm">Sharda University, Greater Noida</p>
                  </div>
                  <span className="text-sm font-bold text-primary shrink-0">Currently Pursuing (2nd Year)</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h5 className="font-bold text-white text-base">Diploma in Electrical Engineering</h5>
                    <p className="text-muted-foreground text-sm">Institute of Management and Engineering, New Delhi</p>
                  </div>
                  <span className="text-sm font-bold text-primary shrink-0">75.25%</span>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-wide border-l-2 border-primary pl-3">Technical Skills</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-white/80 mb-2 text-sm uppercase tracking-wider">Frontend Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Responsive Design", "UI/UX"].map(s => (
                      <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-white/80 mb-2 text-sm uppercase tracking-wider">Backend & Tools</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Supabase", "PostgreSQL", "REST APIs", "Git & GitHub", "Vercel", "Netlify"].map(s => (
                      <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
