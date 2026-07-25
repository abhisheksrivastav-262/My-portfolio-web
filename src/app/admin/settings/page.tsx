"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Save, 
  Upload, 
  Settings, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Image as ImageIcon
} from "lucide-react";

interface SettingsConfig {
  id: string;
  website_title: string;
  seo_description: string;
  meta_keywords: string;
  favicon_url: string;
  logo_url: string;
  og_image_url: string;
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SettingsConfig>({
    id: "00000000-0000-0000-0000-000000000003",
    website_title: "Abhishek Srivastav - Full Stack Developer",
    seo_description: "Portfolio of Abhishek Srivastav, a Full Stack Web Developer building modern, scalable and high-performance web applications.",
    meta_keywords: "Developer, Full Stack, React, Next.js, Portfolio",
    favicon_url: "/profile.jpg",
    logo_url: "/profile.jpg",
    og_image_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Track upload states
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    setError("");
    try {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000003")
        .single();

      if (err) {
        if (err.code === "PGRST116") {
          // Row doesn't exist, insert default
          const { error: insertErr } = await supabase
            .from("settings")
            .insert([settings]);
          if (insertErr) throw insertErr;
        } else {
          throw err;
        }
      } else if (data) {
        setSettings(data);
      }
    } catch (err: any) {
      setError("Unable to read settings from Supabase database. Ensure settings table matches schema.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!supabase) {
        setSuccess(true);
        setSaveLoading(false);
        return;
      }

      const { error: err } = await supabase
        .from("settings")
        .upsert(settings);

      if (err) throw err;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to update configuration settings.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "favicon_url" | "logo_url" | "og_image_url") => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;

    // Set corresponding upload state
    if (field === "logo_url") setUploadingLogo(true);
    if (field === "favicon_url") setUploadingFavicon(true);
    if (field === "og_image_url") setUploadingOg(true);

    setError("");
    setSuccess(false);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `settings_${field}_${Date.now()}.${fileExt}`;
      const filePath = `settings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      // Add to media table
      await supabase.from("media").insert([{
        file_name: file.name,
        file_path: filePath,
        file_url: publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
      }]);

      setSettings((prev) => ({ ...prev, [field]: publicUrl }));
    } catch (err: any) {
      setError(`Failed to upload ${field}. Verify Supabase Storage configuration.`);
    } finally {
      if (field === "logo_url") setUploadingLogo(false);
      if (field === "favicon_url") setUploadingFavicon(false);
      if (field === "og_image_url") setUploadingOg(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black">Website Settings</h1>
        <p className="text-white/60">Manage your SEO, site branding assets, metadata and Open Graph images.</p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex gap-3 items-center">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm flex gap-3 items-center">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Global website settings updated successfully!</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main configuration settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                SEO & Meta Configuration
              </h3>

              {/* Website Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Website Document Title</label>
                <input
                  type="text"
                  required
                  value={settings.website_title}
                  onChange={(e) => setSettings({ ...settings, website_title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* SEO Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Meta Description</label>
                <textarea
                  required
                  rows={4}
                  value={settings.seo_description}
                  onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm leading-relaxed"
                />
              </div>

              {/* Meta Keywords */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Meta Keywords (comma separated)</label>
                <input
                  type="text"
                  required
                  value={settings.meta_keywords}
                  onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saveLoading}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50"
              >
                {saveLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </div>

          {/* Media assets sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-violet-400" />
                Branding Media Assets
              </h3>

              {/* Logo */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-white/60 block uppercase">Site Logo</span>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    {settings.logo_url ? (
                      <img src={settings.logo_url} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-white/30" />
                    )}
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-4 py-2 rounded-xl text-xs font-bold select-none">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, "logo_url")}
                      className="hidden"
                    />
                  </label>
                  {uploadingLogo && <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />}
                </div>
              </div>

              {/* Favicon */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-xs font-bold text-white/60 block uppercase">Site Favicon (.ico / .jpg)</span>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    {settings.favicon_url ? (
                      <img src={settings.favicon_url} alt="Favicon" className="w-8 h-8 object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-white/30" />
                    )}
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-4 py-2 rounded-xl text-xs font-bold select-none">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Favicon</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, "favicon_url")}
                      className="hidden"
                    />
                  </label>
                  {uploadingFavicon && <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />}
                </div>
              </div>

              {/* Open Graph Image */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-xs font-bold text-white/60 block uppercase font-mono">Open Graph Image (1200x630)</span>
                <div className="space-y-3">
                  <div className="w-full aspect-[1.91/1] rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center relative">
                    {settings.og_image_url ? (
                      <img src={settings.og_image_url} alt="OG Banner" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-white/20" />
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-4 py-2.5 rounded-xl text-xs font-bold select-none w-full justify-center">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Banner</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaUpload(e, "og_image_url")}
                        className="hidden"
                      />
                    </label>
                    {uploadingOg && <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
