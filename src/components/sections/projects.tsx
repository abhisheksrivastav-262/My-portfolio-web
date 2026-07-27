"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  githubUrl?: string;
  category: "₹299 Website Samples" | "Premium & Custom Projects" | "E-Commerce Websites";
  priceLabel: string;
  tags: string[];
  image: string;
}

const PROJECTS: Project[] = [
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

const CATEGORIES = ["All", "₹299 Website Samples", "Premium & Custom Projects", "E-Commerce Websites"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col w-full rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden shadow-2xl min-h-[580px]"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 mix-blend-screen"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
      />
      
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/40 rounded-t-[2rem] border-b border-white/5 flex items-center justify-center flex-shrink-0">
        <motion.img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-xs font-black text-primary">
          {project.priceLabel}
        </div>
      </div>

      <div 
        className="flex-1 p-6 flex flex-col justify-between z-10"
        style={{ transform: "translateZ(40px)" }}
      >
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1 block">
            {project.category}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3.5 py-1 rounded-full bg-muted backdrop-blur-md border border-border text-[11px] font-bold uppercase tracking-wider text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:opacity-90 hover:scale-105 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-muted border border-border text-foreground text-xs font-bold hover:bg-muted/80 transition-all"
              >
                <FaGithub className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
            <a
              href="/contact"
              className="ml-auto text-xs text-muted-foreground hover:text-foreground font-bold transition-all"
            >
              Get Started →
            </a>
          </div>
        </div>
      </div>
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
            let category: "₹299 Website Samples" | "Premium & Custom Projects" | "E-Commerce Websites" = "₹299 Website Samples";
            if (p.category === "Premium & Custom Projects" || p.category === "Premium Websites") {
              category = "Premium & Custom Projects";
            } else if (p.category === "E-Commerce Websites" || p.category === "E-Commerce") {
              category = "E-Commerce Websites";
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-7xl mx-auto mb-16">
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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000">
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
