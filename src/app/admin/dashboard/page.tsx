"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  FolderGit2, 
  Star, 
  FileText, 
  Mail, 
  Eye, 
  ArrowUpRight, 
  RefreshCw,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface Stats {
  totalProjects: number;
  featuredProjects: number;
  resumeStatus: string;
  totalMessages: number;
  unreadMessages: number;
  portfolioViews: number;
}

interface Activity {
  id: string;
  description: string;
  time: string;
  type: "project" | "message" | "profile" | "resume" | "settings";
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    featuredProjects: 0,
    resumeStatus: "No resume uploaded",
    totalMessages: 0,
    unreadMessages: 0,
    portfolioViews: 1247, // Premium placeholder
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      if (!supabase) {
        // Mock data when Supabase is not configured
        setStats({
          totalProjects: 11,
          featuredProjects: 3,
          resumeStatus: "Active (/resume.pdf)",
          totalMessages: 4,
          unreadMessages: 2,
          portfolioViews: 1482,
        });
        setRecentMessages([
          { id: "1", name: "John Doe", email: "john@example.com", message: "Love your portfolio! Let's collaborate.", created_at: new Date().toISOString(), read: false },
          { id: "2", name: "Jane Smith", email: "jane@company.com", message: "Are you available for freelance Next.js roles?", created_at: new Date(Date.now() - 3600000).toISOString(), read: true },
        ]);
        setActivities([
          { id: "1", description: "Created project 'Apna Pan Pro'", time: "2 hours ago", type: "project" },
          { id: "2", description: "New contact message from John Doe", time: "3 hours ago", type: "message" },
          { id: "3", description: "Updated profile details", time: "1 day ago", type: "profile" },
        ]);
        setLoading(false);
        return;
      }

      // Fetch Projects count and featured count
      const { data: projects, error: projectsErr } = await supabase
        .from("projects")
        .select("id, featured");

      // Fetch Messages count and unread count
      const { data: messages, error: messagesErr } = await supabase
        .from("messages")
        .select("id, read, name, email, message, created_at")
        .order("created_at", { ascending: false });

      // Fetch Resume
      const { data: resume, error: resumeErr } = await supabase
        .from("resume")
        .select("updated_at, file_url")
        .single();

      // Fetch Website settings
      const { data: settings } = await supabase
        .from("settings")
        .select("updated_at")
        .single();

      const totalProj = projects?.length ?? 0;
      const featProj = projects?.filter((p: any) => p.featured).length ?? 0;
      const unreadMsgs = messages?.filter((m: any) => !m.read).length ?? 0;
      const totalMsgs = messages?.length ?? 0;

      let resumeDesc = "No resume uploaded";
      if (resume?.file_url) {
        const updateDate = new Date(resume.updated_at).toLocaleDateString();
        resumeDesc = `Uploaded (${updateDate})`;
      }

      setStats({
        totalProjects: totalProj,
        featuredProjects: featProj,
        resumeStatus: resumeDesc,
        totalMessages: totalMsgs,
        unreadMessages: unreadMsgs,
        portfolioViews: 1247, // Placeholder
      });

      if (messages) {
        setRecentMessages(messages.slice(0, 4));
      }

      // Compile recent activities
      const acts: Activity[] = [];
      if (messages && messages.length > 0) {
        messages.slice(0, 2).forEach((m: any) => {
          acts.push({
            id: `msg-${m.id}`,
            description: `Message received from ${m.name}`,
            time: formatTimeAgo(m.created_at),
            type: "message"
          });
        });
      }
      if (projects && projects.length > 0) {
        acts.push({
          id: "proj-act",
          description: `Total projects database count: ${projects.length}`,
          time: "Just now",
          type: "project"
        });
      }
      if (settings?.updated_at) {
        acts.push({
          id: "settings-act",
          description: "Website settings updated",
          time: formatTimeAgo(settings.updated_at),
          type: "settings"
        });
      }
      setActivities(acts);
    } catch (err: any) {
      setError("Unable to connect to Supabase tables. Run SQL initialization script.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatTimeAgo = (dateStr: string) => {
    const time = new Date(dateStr).getTime();
    const diff = Date.now() - time;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">Dashboard Overview</h1>
          <p className="text-white/60">A summary of your portfolio metrics and activities.</p>
        </div>
        <button
          onClick={loadData}
          className="w-fit flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex gap-3 items-center">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Projects */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <Link href="/admin/projects" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <span className="text-white/60 text-sm font-semibold">Total Projects</span>
          <h3 className="text-3xl font-black mt-1">{stats.totalProjects}</h3>
        </div>

        {/* Featured Projects */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Star className="w-6 h-6" />
            </div>
            <Link href="/admin/projects" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <span className="text-white/60 text-sm font-semibold">Featured Projects</span>
          <h3 className="text-3xl font-black mt-1">{stats.featuredProjects}</h3>
        </div>

        {/* Resume Status */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <FileText className="w-6 h-6" />
            </div>
            <Link href="/admin/resume" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <span className="text-white/60 text-sm font-semibold">Resume Status</span>
          <h3 className="text-lg font-bold mt-2 truncate">{stats.resumeStatus}</h3>
        </div>

        {/* Total Messages */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Mail className="w-6 h-6" />
            </div>
            <Link href="/admin/messages" className="text-white/40 hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <span className="text-white/60 text-sm font-semibold">Inbox Messages</span>
          <h3 className="text-3xl font-black mt-1">
            {stats.totalMessages}{" "}
            {stats.unreadMessages > 0 && (
              <span className="text-sm font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md ml-2">
                {stats.unreadMessages} New
              </span>
            )}
          </h3>
        </div>

        {/* Portfolio Views */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Live
            </span>
          </div>
          <span className="text-white/60 text-sm font-semibold">Portfolio views (mock)</span>
          <h3 className="text-3xl font-black mt-1">{stats.portfolioViews}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Unread Inbox */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Recent Messages</h3>
            <Link href="/admin/messages" className="text-xs text-primary font-bold hover:underline">
              View All Messages
            </Link>
          </div>

          <div className="space-y-4">
            {recentMessages.length === 0 ? (
              <p className="text-white/40 text-center py-8 text-sm">No messages received yet.</p>
            ) : (
              recentMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`p-4 rounded-xl border transition-all flex justify-between items-start gap-4
                    ${!msg.read 
                      ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white/95">{msg.name}</span>
                      {!msg.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs text-white/40 block">{msg.email}</span>
                    <p className="text-white/70 text-sm line-clamp-1 mt-2">{msg.message}</p>
                  </div>
                  <span className="text-xs text-white/30 shrink-0 font-medium">{formatTimeAgo(msg.created_at)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
          <h3 className="text-xl font-bold">Recent Activities</h3>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-white/40 text-center py-8 text-sm">No recent activity detected.</p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="flex gap-4 items-center">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0
                    ${act.type === "project" ? "bg-primary" : ""}
                    ${act.type === "message" ? "bg-rose-400" : ""}
                    ${act.type === "profile" ? "bg-violet-400" : ""}
                    ${act.type === "resume" ? "bg-amber-400" : ""}
                    ${act.type === "settings" ? "bg-emerald-400" : ""}
                  `} />
                  <div className="flex-1 flex justify-between items-center gap-4">
                    <span className="text-sm font-semibold text-white/80">{act.description}</span>
                    <span className="text-xs text-white/30 font-medium shrink-0">{act.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
