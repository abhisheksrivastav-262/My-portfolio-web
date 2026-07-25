"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { Lock, Mail, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

export default function LoginPage() {
  const { user, loading, isConfigured } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [mode, setMode] = useState<"login" | "reset">("login");

  // Redirect if already logged in
  React.useEffect(() => {
    if (!loading && user) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setAuthError("");
    setIsSubmitting(true);

    if (!isConfigured || !supabase) {
      setAuthError("Supabase environment variables are not configured in .env.local.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setAuthError("");
    setIsSubmitting(true);

    if (!isConfigured || !supabase) {
      setAuthError("Supabase environment variables are not configured.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        setAuthError(error.message);
      } else {
        setResetSent(true);
      }
    } catch (err: any) {
      setAuthError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02010a] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-white/60 font-medium">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#02010a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2">
            ADMIN <span className="text-primary bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">PORTAL</span>
          </h1>
          <p className="text-white/60 text-sm">
            {mode === "login"
              ? "Sign in to manage your portfolio site."
              : "Enter your email to request a password reset."}
          </p>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <span className="font-bold">Missing configuration:</span> Add your Supabase credentials to `.env.local` to connect your backend.
            </div>
          </div>
        )}

        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex gap-3 items-center">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {resetSent ? (
          <div className="text-center space-y-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Reset Email Sent</h2>
              <p className="text-sm text-white/60">
                Check your inbox for a link to reset your administrator password.
              </p>
            </div>
            <button
              onClick={() => {
                setResetSent(false);
                setMode("login");
              }}
              className="text-primary hover:underline text-sm font-semibold"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={mode === "login" ? handleLogin : handleForgotPassword} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-white/80">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {mode === "login" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-semibold text-white/80">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError("");
                      setMode("reset");
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-white/40" />
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-white hover:bg-white/90 text-black font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Send Reset Link"
              )}
            </button>

            {mode === "reset" && (
              <button
                type="button"
                onClick={() => {
                  setAuthError("");
                  setMode("login");
                }}
                className="w-full text-center text-sm text-white/60 hover:text-white transition-colors"
              >
                Back to Sign In
              </button>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
}
