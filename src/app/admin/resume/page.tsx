"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Upload, 
  Trash2, 
  Download, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle 
} from "lucide-react";

export default function ResumeAdminPage() {
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf"); // Default fallback
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadResumeInfo = async () => {
    setLoading(true);
    setError("");
    try {
      if (!supabase) {
        setUpdatedAt("Local System Default");
        setLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("resume")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000002")
        .single();

      if (err) {
        if (err.code === "PGRST116") {
          // No record, we will use default "/resume.pdf"
          setResumeUrl("/resume.pdf");
        } else {
          throw err;
        }
      } else if (data) {
        setResumeUrl(data.file_url);
        setUpdatedAt(new Date(data.updated_at).toLocaleString());
      }
    } catch (err: any) {
      setError("Unable to read resume information from Supabase database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumeInfo();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported for resumes.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      if (!supabase) {
        // Mock local update
        setResumeUrl(URL.createObjectURL(file));
        setUpdatedAt(new Date().toLocaleString());
        setSuccess("Mock upload complete. Local file URL generated.");
        setUploading(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `resume_${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      // Upload file to Supabase storage 'media' bucket
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      // Save/Upsert to resume table
      const { error: dbError } = await supabase
        .from("resume")
        .upsert({
          id: "00000000-0000-0000-0000-000000000002",
          file_url: publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (dbError) throw dbError;

      // Add to media table
      await supabase.from("media").insert([{
        file_name: file.name,
        file_path: filePath,
        file_url: publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
      }]);

      setResumeUrl(publicUrl);
      setUpdatedAt(new Date().toLocaleString());
      setSuccess("Resume uploaded and updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to upload resume. Make sure storage bucket 'media' exists in Supabase.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resume? The portfolio will revert to default resume link.")) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!supabase) {
        setResumeUrl("/resume.pdf");
        setUpdatedAt(null);
        setSuccess("Mock resume reset to default.");
        setLoading(false);
        return;
      }

      // Delete from table
      const { error: err } = await supabase
        .from("resume")
        .delete()
        .eq("id", "00000000-0000-0000-0000-000000000002");

      if (err) throw err;

      setResumeUrl("/resume.pdf");
      setUpdatedAt(null);
      setSuccess("Resume record deleted successfully. Fallback active.");
    } catch (err: any) {
      setError(err.message || "Failed to delete resume record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black">Resume Management</h1>
        <p className="text-white/60">Upload, preview, replace, or delete your professional CV resume PDF.</p>
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
          <span>{success}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls & Upload */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Active Resume CV</h3>
                  <p className="text-xs text-white/40">
                    {updatedAt ? `Last updated: ${updatedAt}` : "No resume uploaded yet"}
                  </p>
                </div>
              </div>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors relative group">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-primary transition-colors">
                    {uploading ? (
                      <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                    ) : (
                      <Upload className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">Click or drag PDF here to upload</p>
                    <p className="text-xs text-white/40 mt-1">Accepts only .pdf files up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* URL field display */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase">Resume File Path / URL</label>
                <input
                  type="text"
                  readOnly
                  value={resumeUrl}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white/60 focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Preview URL
              </a>
              <a
                href={resumeUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-colors shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-400 font-bold text-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Inline Preview Canvas */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md flex flex-col min-h-[500px]">
            <div className="flex justify-between items-center px-4 pb-4 border-b border-white/5">
              <span className="text-sm font-bold">Interactive Preview</span>
              <span className="text-xs text-white/40">PDF Render Canvas</span>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden bg-black/40 mt-4 border border-white/5">
              {resumeUrl ? (
                <iframe
                  src={`${resumeUrl}#toolbar=0`}
                  className="w-full h-full border-none min-h-[400px]"
                  title="Resume PDF Preview"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/30 gap-2">
                  <FileText className="w-12 h-12" />
                  <span className="text-sm">No Preview Available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
