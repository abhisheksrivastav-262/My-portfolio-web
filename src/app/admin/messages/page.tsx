"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Mail, 
  MailOpen, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Search,
  CheckCircle,
  Inbox
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMessages = async () => {
    setLoading(true);
    setError("");
    try {
      if (!supabase) {
        // Fallback mock messages
        const mock: Message[] = [
          { id: "1", name: "John Doe", email: "john@example.com", subject: "Collaboration", message: "Hey Abhishek, I saw your Next.js works and would love to talk about a potential freelance project. Let me know when you are free!", read: false, created_at: new Date().toISOString() },
          { id: "2", name: "Sarah Connor", email: "sarah@cyberdyne.com", subject: "Urgent Job Opportunity", message: "We are looking for a remote Full Stack developer with strong React/Next.js experience. Can you review our description and apply?", read: false, created_at: new Date(Date.now() - 7200000).toISOString() },
          { id: "3", name: "Alex Mercer", email: "alex@gentek.org", subject: "Nice Portfolio", message: "Really clean portfolio! Love the glassmorphism and the fast transitions.", read: true, created_at: new Date(Date.now() - 86400000).toISOString() }
        ];
        setMessages(mock);
        setLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setMessages(data || []);
    } catch (err: any) {
      setError("Unable to read contact messages. Ensure Supabase 'messages' table is created.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (msg: Message) => {
    try {
      const newReadState = !msg.read;
      if (!supabase) {
        setMessages(messages.map((m) => m.id === msg.id ? { ...m, read: newReadState } : m));
        return;
      }

      const { error: err } = await supabase
        .from("messages")
        .update({ read: newReadState })
        .eq("id", msg.id);

      if (err) throw err;
      loadMessages();
    } catch (err: any) {
      setError("Failed to update message status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setError("");

    try {
      if (!supabase) {
        setMessages(messages.filter((m) => m.id !== id));
        return;
      }

      const { error: err } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

      if (err) throw err;
      loadMessages();
    } catch (err: any) {
      setError("Failed to delete message.");
    }
  };

  // Filter and search
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "unread" && !msg.read) || 
      (filter === "read" && msg.read);

    const matchesSearch = 
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      (msg.subject && msg.subject.toLowerCase().includes(search.toLowerCase())) ||
      msg.message.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">Contact Messages</h1>
          <p className="text-white/60">Read and manage incoming inquiries from your portfolio contact form.</p>
        </div>
        <button
          onClick={loadMessages}
          className="w-fit flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Inbox
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex gap-3 items-center">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search sender, email, content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto">
          {[
            { id: "all", label: "All Inbox" },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "read", label: "Read" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all
                ${filter === tab.id 
                  ? "bg-primary text-white" 
                  : "text-white/60 hover:text-white"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List Container */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/30 gap-3">
            <Inbox className="w-12 h-12 text-white/20" />
            <p className="text-sm">No messages match the current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`p-6 transition-all space-y-4 hover:bg-white/[0.01]
                  ${!msg.read ? 'bg-primary/[0.02]' : ''}
                `}
              >
                {/* Meta header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-base text-white">{msg.name}</span>
                      {!msg.read && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary/20 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/50 block font-medium">{msg.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30 font-medium">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Subject & content */}
                <div className="space-y-2">
                  {msg.subject && (
                    <div className="text-sm font-bold text-white/90">
                      Subject: <span className="text-primary">{msg.subject}</span>
                    </div>
                  )}
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    {msg.message}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleToggleRead(msg)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all
                      ${msg.read 
                        ? 'bg-white/5 border-white/5 text-white/60 hover:text-white' 
                        : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                      }
                    `}
                  >
                    {msg.read ? (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        Mark Unread
                      </>
                    ) : (
                      <>
                        <MailOpen className="w-3.5 h-3.5" />
                        Mark Read
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-500/5 border border-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
