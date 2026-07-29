"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  githubUrl?: string;
  category: "₹299 Website Samples" | "Premium & Custom Projects" | "E-Commerce Websites" | "Multipage Websites";
  priceLabel: string;
  tags: string[];
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "apna-pan-pro",
    name: "Apna Pan Pro",
    description: "A comprehensive real estate and property management platform designed to simplify property searching, buying, and renting with an intuitive user interface.",
    url: "https://apna-pan-pro-main.vercel.app",
    githubUrl: "https://github.com/abhisheksrivastav-262",
    category: "Premium & Custom Projects",
    priceLabel: "Custom Pricing",
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "hgs-sportswear",
    name: "HGS Sportswear Showcase",
    description: "A premium e-commerce showcase for athletic wear, featuring a modern glassmorphism design, high-performance animations, and an engaging product discovery experience.",
    url: "https://hgs-sportswear-showcase.lovable.app",
    githubUrl: "https://github.com/abhisheksrivastav-262",
    category: "E-Commerce Websites",
    priceLabel: "Custom Pricing",
    tags: ["E-commerce", "Framer Motion", "React", "TypeScript"],
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "budget-landing-1",
    name: "Local Gym Landing Page",
    description: "A highly responsive, lightning-fast single-page landing page featuring appointment booking, services display, and interactive contact form.",
    url: "#",
    githubUrl: "https://github.com/abhisheksrivastav-262",
    category: "₹299 Website Samples",
    priceLabel: "₹299",
    tags: ["Next.js", "Tailwind CSS", "WhatsApp Integration"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "budget-portfolio-1",
    name: "Freelancer Profile Showcase",
    description: "Elegant and minimal single-page portfolio layout for showcasing individual creative services, completed projects, and personal branding details.",
    url: "#",
    githubUrl: "https://github.com/abhisheksrivastav-262",
    category: "₹299 Website Samples",
    priceLabel: "₹299",
    tags: ["React", "Vercel Hosting", "Glassmorphic UI"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "brandoraglow",
    name: "BrandoraGlow",
    description: "A stunning beauty and cosmetics brand showcase with magnetic hover effects, vibrant color palettes, and fluid page transitions.",
    url: "https://brandoraglow-in.lovable.app",
    githubUrl: "https://github.com/abhisheksrivastav-262",
    category: "E-Commerce Websites",
    priceLabel: "Custom Pricing",
    tags: ["Beauty", "Showcase", "Animations", "React"],
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "budget-restaurant-1",
    name: "Cafe Bistro Single Page",
    description: "An attractive single-page bistro menu website with WhatsApp ordering triggers, location guide maps, and operating hour alerts.",
    url: "#",
    githubUrl: "https://github.com/abhisheksrivastav-262",
    category: "₹299 Website Samples",
    priceLabel: "₹299",
    tags: ["HTML5", "CSS3", "Mobile Optimized"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  }
];

const CATEGORIES = ["All", "₹299 Website Samples", "Premium & Custom Projects", "E-Commerce Websites", "Multipage Websites"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col w-full rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md overflow-hidden"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col p-6 w-full h-full"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors line-clamp-1">
            {project.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors mt-0.5" />
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-1 mb-6 flex-1">
          {project.description}
        </p>
        
        <div className="mt-auto">
          <span className="text-[13px] font-semibold text-primary">
            {project.priceLabel}
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: Project[] = data.map((p: any) => {
            // Map table categories cleanly
            let category: "₹299 Website Samples" | "Premium & Custom Projects" | "E-Commerce Websites" | "Multipage Websites" = "₹299 Website Samples";
            if (p.category === "Premium & Custom Projects" || p.category === "Premium Websites") {
              category = "Premium & Custom Projects";
            } else if (p.category === "E-Commerce Websites" || p.category === "E-Commerce") {
              category = "E-Commerce Websites";
            } else if (p.category === "Multipage Websites") {
              category = "Multipage Websites";
            }

            return {
              id: p.id || String(p.sort_order),
              name: p.title,
              description: p.description,
              url: p.live_url || "#",
              githubUrl: p.github_url || undefined,
              category: category,
              priceLabel: category === "₹299 Website Samples" ? "₹299" : "Custom Pricing",
              tags: p.tech_stack || [],
              image: p.thumbnail_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
            };
          });
          setProjectList(mapped);
        }
      } catch (err) {
        console.error("Failed to load projects from Supabase:", err);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projectList.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-32 relative z-10 border-t border-border bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Explore our professional web deliverables grouped by budget & style tiers.
          </motion.p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 max-w-6xl mx-auto mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === category 
                  ? "bg-primary text-primary-foreground border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]" 
                  : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tech stack or projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted border border-border rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
