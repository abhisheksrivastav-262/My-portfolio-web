"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Code2, Monitor, Server, Database, Cloud, Wrench, GitBranch, Globe } from "lucide-react";
import { 
  FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaGithub, FaFigma
} from "react-icons/fa";
import { 
  SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiPostgresql, 
  SiMongodb, SiVercel, SiNetlify, SiExpress, SiPrisma, SiGit
} from "react-icons/si";

const stack = [
  {
    category: "Languages",
    icon: Code2,
    technologies: [
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "Python", icon: FaPython, color: "text-blue-400" }
    ]
  },
  {
    category: "Frontend",
    icon: Monitor,
    technologies: [
      { name: "React", icon: FaReact, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" }
    ]
  },
  {
    category: "Backend",
    icon: Server,
    technologies: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "Express", icon: SiExpress, color: "text-gray-300" },
      { name: "Prisma", icon: SiPrisma, color: "text-white" }
    ]
  },
  {
    category: "Database",
    icon: Database,
    technologies: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" }
    ]
  },
  {
    category: "Cloud",
    icon: Cloud,
    technologies: [
      { name: "AWS", icon: FaAws, color: "text-orange-400" },
      { name: "Docker", icon: FaDocker, color: "text-blue-500" }
    ]
  },
  {
    category: "Deployment",
    icon: Globe,
    technologies: [
      { name: "Vercel", icon: SiVercel, color: "text-white" },
      { name: "Netlify", icon: SiNetlify, color: "text-teal-400" }
    ]
  },
  {
    category: "Version Control",
    icon: GitBranch,
    technologies: [
      { name: "Git", icon: SiGit, color: "text-orange-500" },
      { name: "GitHub", icon: FaGithub, color: "text-white" }
    ]
  },
  {
    category: "Tools",
    icon: Wrench,
    technologies: [
      { name: "Figma", icon: FaFigma, color: "text-pink-400" },
      { name: "VS Code", icon: Code2, color: "text-blue-500" }
    ]
  }
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-32 w-full bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -left-40 top-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
            <Code2 className="h-3.5 w-3.5" />
            My Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            <span className="text-gradient">Technologies</span> I Use
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A comprehensive list of my technical skills, tools, and platforms I work with to build high-performance applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {stack.map((group, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md p-6 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-background/80 border border-border/50 text-foreground">
                    <group.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{group.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {group.technologies.map((tech, j) => (
                    <div 
                      key={j} 
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background hover:border-primary/30 transition-colors group/tech cursor-default"
                    >
                      <tech.icon className={`w-4 h-4 ${tech.color} group-hover/tech:scale-110 transition-transform`} />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
