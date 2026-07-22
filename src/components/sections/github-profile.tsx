"use client";

import { motion } from "framer-motion";
import { useGitHub } from "@/hooks/use-github";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { Users, MapPin, Building, Link as LinkIcon, CalendarDays, BookMarked, Code2, Activity } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "abhisheksrivastav-262";

export function GithubProfileSection() {
  const { user, loading, error } = useGitHub(GITHUB_USERNAME);

  if (loading) {
    return (
      <section className="py-24 w-full bg-background relative overflow-hidden flex justify-center">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
          <div className="animate-pulse rounded-3xl border border-border/50 bg-card/40 p-8 md:p-12 h-[500px] w-full" />
        </div>
      </section>
    );
  }

  if (error || !user) {
    return null; 
  }

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <section id="github" className="py-32 w-full bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.04),transparent)] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub Stats
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            My <span className="text-gradient">Open Source</span> Journey
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A real-time overview of my GitHub activity, contributions, and top languages.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          className="max-w-6xl mx-auto flex flex-col gap-6"
        >
          {/* Main Profile Card */}
          <div className="group relative rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-8 md:p-10 overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.avatar_url} alt={user.login} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-background p-1.5 rounded-full border border-border shadow-sm">
                  <GithubIcon className="w-6 h-6 text-foreground" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 w-full flex flex-col">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-1">{user.name || user.login}</h3>
                    <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-lg font-medium inline-flex items-center gap-1.5">
                      @{user.login}
                    </a>
                  </div>
                  
                  <a
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants(), "rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 font-semibold mx-auto md:mx-0 w-max shadow-lg")}
                  >
                    Follow on GitHub
                  </a>
                </div>

                {user.bio && (
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg max-w-2xl mx-auto md:mx-0">
                    {user.bio}
                  </p>
                )}

                {/* Details List */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center md:justify-start text-sm text-muted-foreground mb-8">
                  {user.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {user.location}
                    </div>
                  )}
                  {user.company && (
                    <div className="flex items-center gap-1.5">
                      <Building className="w-4 h-4" /> {user.company}
                    </div>
                  )}
                  {user.blog && (
                    <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <LinkIcon className="w-4 h-4" /> {user.blog.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" /> Joined {joinDate}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group-hover:border-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-foreground mb-1">{user.followers}</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1"><Users className="w-3 h-3" /> Followers</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group-hover:border-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-foreground mb-1">{user.following}</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1"><Users className="w-3 h-3" /> Following</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group-hover:border-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-foreground mb-1">{user.public_repos}</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1"><BookMarked className="w-3 h-3" /> Repositories</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group-hover:border-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-foreground mb-1">{user.public_gists}</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1"><Code2 className="w-3 h-3" /> Gists</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub API Readme Stats Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Languages */}
            <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 flex flex-col justify-center items-center hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-semibold w-full flex items-center gap-2 mb-4"><Code2 className="w-4 h-4 text-primary" /> Top Languages</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=transparent&hide_border=true&title_color=3b82f6&text_color=a1a1aa&icon_color=3b82f6&bg_color=00000000`}
                alt="Top Languages"
                className="w-full max-w-[400px] h-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Contribution Graph (using ghchart) */}
            <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 flex flex-col justify-center items-center hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-semibold w-full flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-primary" /> Contributions</h3>
              <div className="w-full overflow-x-auto pb-2 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`https://ghchart.rshah.org/3b82f6/${user.login}`}
                  alt="Contribution Graph"
                  className="w-full min-w-[500px] max-w-[600px] h-auto object-contain opacity-80 hue-rotate-180 invert contrast-150 saturate-200" 
                  loading="lazy"
                  style={{ filter: 'invert(1) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                />
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
