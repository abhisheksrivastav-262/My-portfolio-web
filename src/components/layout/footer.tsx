"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MagneticButton } from "../ui/magnetic-button";

const FOOTER_NAV = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-background pt-32 pb-12 overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--primary-glow,rgba(139,92,246,0.06)),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="Abhi Technologies"
                className="h-12 w-12 rounded-full border border-border object-cover mb-4"
              />
            </div>

            <p className="font-bold text-foreground text-xl mb-1">Abhi Technologies</p>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Founder & Full Stack Web Developer
            </p>
            <p className="text-muted-foreground text-xs mb-6">
              Premium Websites • Modern Web Solutions • Business Growth
            </p>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:abhitechnologies262@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                abhitechnologies262@gmail.com
              </a>
              <a
                href="tel:+918140353442"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-secondary" />
                +91 8140353442
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Silvassa, Dadra & Nagar Haveli, India
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-start md:items-end">
            {/* Footer Nav */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-end">
              {FOOTER_NAV.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* WhatsApp CTA */}
            <MagneticButton>
              <a
                href="https://wa.me/918140353442"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#25D366] hover:opacity-90 text-white font-semibold transition-all text-sm shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </MagneticButton>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/abhisheksrivastav-262", label: "GitHub" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/abhishek-srivastav-681ab1257", label: "LinkedIn" },
                { icon: FaInstagram, href: "https://instagram.com/abhitechnologies262", label: "Instagram" },
                { icon: FaWhatsapp, href: "https://wa.me/918140353442", label: "WhatsApp" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm">
            © 2026 Abhi Technologies. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/admin/login"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </Link>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
