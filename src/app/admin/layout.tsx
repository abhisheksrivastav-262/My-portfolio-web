"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/components/admin/admin-auth-provider";
import { 
  LayoutDashboard, 
  FolderGit2, 
  UserSquare2, 
  FileText, 
  Mail, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Profile", href: "/admin/profile", icon: UserSquare2 },
  { name: "Resume", href: "/admin/resume", icon: FileText },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, signOut, loading } = useAdminAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#02010a] text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#02010a] text-white flex flex-col md:flex-row relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#080613]/90 border-b border-white/5 backdrop-blur-md sticky top-0 z-40 w-full">
        <Link href="/admin/dashboard" className="text-lg font-black tracking-wider text-white">
          ADMIN<span className="text-primary">PORTAL</span>
        </Link>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white/80 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-[#080613]/95 border-r border-white/5 p-6 flex flex-col justify-between transition-transform duration-300 backdrop-blur-xl
        md:translate-x-0 md:static md:h-screen md:bg-white/5 md:backdrop-blur-md md:z-10
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/admin/dashboard" 
              className="text-xl font-black tracking-wider text-white flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              ADMIN<span className="text-primary bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">PORTAL</span>
            </Link>
          </div>

          {user && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-xs text-white/40 font-bold uppercase tracking-wider">Logged in as</span>
              <span className="text-sm font-medium truncate text-white/90">{user.email}</span>
            </div>
          )}

          <nav className="space-y-1.5">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group relative
                    ${isActive 
                      ? "text-white bg-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all group"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4" />
              <span>View Portfolio</span>
            </span>
          </Link>
          <button
            onClick={() => {
              setMobileOpen(false);
              signOut();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main data-lenis-prevent className="flex-1 md:h-screen md:overflow-y-auto p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="min-h-full w-full max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
