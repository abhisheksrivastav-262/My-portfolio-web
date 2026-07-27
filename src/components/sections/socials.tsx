"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface SocialCard {
  name: string;
  url: string;
  icon: any;
  color: string;
  glowColor: string;
}

const SOCIALS: SocialCard[] = [
  {
    name: "GitHub",
    url: "https://github.com/abhisheksrivastav-262",
    icon: FaGithub,
    color: "text-white",
    glowColor: "rgba(255, 255, 255, 0.15)"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abhishek-srivastav-681ab1257",
    icon: FaLinkedin,
    color: "text-[#0077B5]",
    glowColor: "rgba(0, 119, 181, 0.2)"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/abhitechnologies262",
    icon: FaInstagram,
    color: "text-[#E1306C]",
    glowColor: "rgba(225, 48, 108, 0.2)"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/918140353442",
    icon: FaWhatsapp,
    color: "text-[#25D366]",
    glowColor: "rgba(37, 211, 102, 0.2)"
  },
  {
    name: "Email",
    url: "mailto:abhitechnologies262@gmail.com",
    icon: Mail,
    color: "text-[#EA4335]",
    glowColor: "rgba(234, 67, 53, 0.2)"
  },
  {
    name: "Phone",
    url: "tel:+918140353442",
    icon: Phone,
    color: "text-[#34A853]",
    glowColor: "rgba(52, 168, 83, 0.2)"
  }
];

function InteractiveCard({ social }: { social: SocialCard }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = social.icon;

  return (
    <motion.a
      ref={cardRef}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05 }}
      className="relative flex flex-col items-center justify-center p-8 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl cursor-pointer overflow-hidden transition-all duration-300 group select-none h-48"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${social.glowColor} 0%, transparent 60%)`
        }}
      />

      {/* Interactive Border */}
      <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-3xl transition-colors duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center" style={{ transform: "translateZ(30px)" }}>
        <div className={`p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300 ${social.color}`}>
          <IconComponent className="w-8 h-8" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-white tracking-wide group-hover:text-primary transition-colors text-lg">
            {social.name}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
        </div>
      </div>
    </motion.a>
  );
}

export function SocialsSection() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 bg-[#030014]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
          >
            Connect With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Find us on our social profiles and reach out through your preferred channel.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {SOCIALS.map((social) => (
            <InteractiveCard key={social.name} social={social} />
          ))}
        </div>
      </div>
    </section>
  );
}
