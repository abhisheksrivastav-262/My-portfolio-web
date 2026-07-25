"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
  });

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-background/60 backdrop-blur-2xl py-3"
          : "bg-transparent border-transparent py-5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 group relative z-10"
        >
          <motion.img 
            src="/profile.jpg"
            alt="Abhishek Srivastav"
            whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 12px rgba(139,92,246,0.6))" }}
            transition={{ duration: 0.3 }}
            className="h-10 w-10 rounded-full border border-white/20 object-cover cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium transition-colors rounded-full group",
                  isActive ? "text-white" : "text-muted-foreground hover:text-white"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive ? (
                  <motion.span 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute inset-0 bg-white/5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <MagneticButton>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform duration-300"
            >
              Let's Talk
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden relative z-10 p-2 text-foreground">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] border-none bg-background/95 backdrop-blur-2xl p-8 flex flex-col justify-center">
            <div className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-4xl font-bold transition-all duration-300 inline-block hover:pl-4",
                      pathname === link.href ? "text-white" : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors"
                >
                  Hire Me Now
                </Link>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
