"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Portfolio", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Pay", href: "/pay" }
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("Home");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
  });

  // Track active section on home page scrolling
  React.useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "services", "pricing", "projects", "about", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedLink = NAV_LINKS.find(link => {
            if (id === "home") return link.href === "/";
            return link.href === `/${id}` || link.href === `/projects` && id === "projects";
          });
          if (matchedLink) {
            setActiveSection(matchedLink.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-2xl py-3"
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
          className="flex items-center gap-2 group relative z-10"
        >
          <motion.img
            src="/logo.png"
            alt="Abhi Technologies"
            whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 12px rgba(139,92,246,0.6))" }}
            transition={{ duration: 0.3 }}
            className="h-10 w-10 rounded-full border border-border object-cover cursor-pointer"
          />
          <span className="hidden sm:block font-bold text-foreground text-sm tracking-wide">
            Abhi<span className="text-primary">Tech</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/30 border border-border rounded-full px-2 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isHome = pathname === "/";
            const isActive = isHome 
              ? activeSection === link.name 
              : pathname === link.href || pathname?.startsWith(link.href + "/");

            return (
              <Link
                key={link.name}
                href={isHome && link.href.startsWith("/") && link.href !== "/" && link.href !== "/pay" ? `#${link.href.replace("/", "")}` : link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full group",
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive ? (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-muted rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute inset-0 bg-muted/50 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                )}
              </Link>
            );
          })}
          
          {/* Theme Toggle Button next to Pay link */}
          <button
            onClick={toggleTheme}
            className="relative p-2 ml-1 text-muted-foreground hover:text-foreground transition-colors rounded-full"
            aria-label="Toggle Theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-violet-500" />
            )}
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <MagneticButton>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-violet-500" />
              )}
            </button>
            <SheetTrigger className="relative z-10 p-2 text-foreground">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
          </div>
          <SheetContent side="right" className="w-full sm:w-[400px] border-none bg-background/95 backdrop-blur-2xl p-8 flex flex-col justify-center">
            <div className="flex flex-col gap-6 text-center">
               {NAV_LINKS.map((link, i) => {
                 const isHome = pathname === "/";
                 return (
                   <motion.div
                     key={link.name}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.05 + i * 0.05 }}
                   >
                     <Link
                       href={isHome && link.href.startsWith("/") && link.href !== "/" && link.href !== "/pay" ? `#${link.href.replace("/", "")}` : link.href}
                       onClick={() => setOpen(false)}
                       className={cn(
                         "text-3xl font-bold transition-all duration-300 inline-block hover:pl-4",
                         (isHome ? activeSection === link.name : pathname === link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                       )}
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 );
               })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full inline-block px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
