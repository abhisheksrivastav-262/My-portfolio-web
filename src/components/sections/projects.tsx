"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { TextReveal } from "../ui/text-reveal";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  category: "Featured" | "E-Commerce" | "SaaS" | "Portfolio" | "Other";
  tags: string[];
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "apna-pan-pro",
    name: "Apna Pan Pro",
    description: "A comprehensive real estate and property management platform designed to simplify property searching, buying, and renting with an intuitive user interface.",
    url: "https://apna-pan-pro-main.vercel.app",
    category: "Featured",
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "hgs-sportswear",
    name: "HGS Sportswear Showcase",
    description: "A premium e-commerce showcase for athletic wear, featuring a modern glassmorphism design, high-performance animations, and an engaging product discovery experience.",
    url: "https://hgs-sportswear-showcase.lovable.app",
    category: "E-Commerce",
    tags: ["E-commerce", "Framer Motion", "React", "TypeScript"],
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "rajvi-pure-nature",
    name: "Rajvi Pure Nature",
    description: "An elegant web platform for organic and natural products, focusing on sustainability, clean aesthetics, and a smooth user journey.",
    url: "https://rajvi-pure-nature.lovable.app",
    category: "Other",
    tags: ["Organic", "React", "Tailwind CSS", "UI/UX"],
    image: "https://images.unsplash.com/photo-1611078586071-8bc62512ee96?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "wabix-sync-hub",
    name: "Wabix Sync Hub",
    description: "A powerful synchronization and team collaboration hub designed to streamline workflows with real-time updates and seamless integration capabilities.",
    url: "https://wabix-sync-hub.lovable.app",
    category: "SaaS",
    tags: ["SaaS", "Dashboard", "Real-time", "TypeScript"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "brandoraglow",
    name: "BrandoraGlow",
    description: "A stunning beauty and cosmetics brand showcase with magnetic hover effects, vibrant color palettes, and fluid page transitions.",
    url: "https://brandoraglow-in.lovable.app",
    category: "E-Commerce",
    tags: ["Beauty", "Showcase", "Animations", "React"],
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "astro-celestial",
    name: "Astro Celestial Guide",
    description: "An immersive astrology and celestial events guide featuring dark mode aesthetics, interactive star maps, and dynamic user interfaces.",
    url: "https://astro-celestial-guide.lovable.app",
    category: "Other",
    tags: ["Astrology", "Interactive", "Dark Mode", "Web3D"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "crease-creations",
    name: "Crease Creations",
    description: "A creative portfolio platform for origami and paper art, showcasing intricate designs through smooth zoom effects and a minimalist layout.",
    url: "https://crease-creations.lovable.app",
    category: "Portfolio",
    tags: ["Portfolio", "Art", "Minimalist", "React"],
    image: "https://images.unsplash.com/photo-1582657159781-dbbe06eb6404?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "luxury-interior",
    name: "Luxury Interior",
    description: "An exclusive interior design showcase application that brings architectural concepts to life with high-fidelity visuals and elegant typography.",
    url: "https://luxuryinterior01.lovable.app",
    category: "Portfolio",
    tags: ["Architecture", "Design", "Premium", "Next.js"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "clean-water-dream",
    name: "Clean Water Dream",
    description: "A non-profit initiative platform dedicated to clean water awareness, featuring impactful storytelling through scroll-driven animations.",
    url: "https://clean-water-dream.lovable.app",
    category: "Other",
    tags: ["Non-profit", "Storytelling", "Animations", "React"],
    image: "https://images.unsplash.com/photo-1538300342682-ffa5ac831843?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "kolkata-media",
    name: "Kolkata Media",
    description: "A dynamic news and media publishing platform providing real-time updates, structured content delivery, and a robust reading experience.",
    url: "https://kolkatamedia.lovable.app",
    category: "Other",
    tags: ["Media", "Publishing", "CMS", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "tiffin-treats",
    name: "Tiffin Treats Connect",
    description: "A delightful food delivery and subscription service interface connecting home chefs with customers through a seamless ordering system.",
    url: "https://tiffin-treats-connect.lovable.app",
    category: "Other",
    tags: ["Food Tech", "Marketplace", "React", "UX Design"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
  }
];

const CATEGORIES = ["All", "Featured", "E-Commerce", "SaaS", "Portfolio", "Other"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col w-full rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden cursor-pointer shadow-2xl h-[560px]"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 mix-blend-screen"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
      />
      
      {/* 16:9 Thumbnail Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/40 rounded-t-[2rem] border-b border-white/5 flex items-center justify-center flex-shrink-0">
        <motion.img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-contain transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div 
        className="flex-1 p-6 flex flex-col justify-between z-10"
        style={{ transform: "translateZ(40px)" }}
      >
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          
          <p className="text-white/80 line-clamp-2 mb-4 text-base">
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="w-fit">
            <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] group-hover:scale-105 transition-all">
              <span>🚀 Live Preview</span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("display", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: Project[] = data.map((d: any) => ({
            id: d.id,
            name: d.title,
            description: d.description,
            url: d.live_url,
            category: d.category,
            tags: d.tech_stack,
            image: d.thumbnail_url
          }));
          setProjectList(mapped);
        }
      } catch (err: any) {
        console.error("Error loading projects from DB, falling back to static:", err?.message || err?.details || err);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projectList.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <section id="projects" className="py-32 relative z-10 border-t border-white/5 bg-[#02010a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <TextReveal text="Selected Works" />
          </motion.h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                activeCategory === category 
                ? "bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]" 
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto perspective-1000">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
