"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Download, Heart, ArrowUp, Phone, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { MagneticButton } from "../ui/magnetic-button";
import { supabase } from "@/lib/supabase";

export function Footer() {
  const pathname = usePathname();
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-[#02010a] pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="/profile.jpg" 
                alt="Abhishek Srivastav" 
                className="h-12 w-12 rounded-full border border-white/20 object-cover mb-4"
              />
            </div>
            
            <p className="text-white/60 font-bold mb-2">Abhishek Srivastav</p>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-6">AI Full Stack Web Developer</p>
            
            <div className="space-y-3 text-sm">
              <a href="mailto:abhisheksrivastav262@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                abhisheksrivastav262@gmail.com
              </a>
              <a href="tel:+918140353442" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-secondary" />
                +91 8140353442
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end">
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <a 
                  href={resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all text-sm"
                >
                  View Resume
                </a>
              </MagneticButton>
              <MagneticButton>
                <a 
                  href={resumeUrl} 
                  download 
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary hover:bg-primary/95 text-white font-semibold transition-all text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </MagneticButton>
            </div>
            
            <div className="flex gap-4 mt-4">
              {[
                { icon: FaGithub, href: "https://github.com/abhisheksrivastav-262" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/abhishek-srivastav-681ab1257" },
                { icon: FaGlobe, href: "https://vercel.com/abhi262" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Abhishek Srivastav. Built with <Heart className="w-4 h-4 text-primary fill-primary" />
          </p>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/admin/login" 
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              Admin
            </Link>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
