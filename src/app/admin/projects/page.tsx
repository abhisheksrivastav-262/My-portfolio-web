"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  live_url: string;
  github_url?: string;
  tech_stack: string[];
  category: string;
  featured: boolean;
  display: boolean;
  sort_order: number;
}

const CATEGORIES = ["Featured", "E-Commerce", "SaaS", "Portfolio", "Other"];

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeProject, setActiveProject] = useState<Partial<Project> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [techInput, setTechInput] = useState("");

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      if (!supabase) {
        // Fallback mock projects list
        const mock: Project[] = [
          {
            id: "apna-pan-pro",
            title: "Apna Pan Pro",
            description: "A comprehensive real estate platform.",
            thumbnail_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
            live_url: "https://apna-pan-pro-main.vercel.app",
            github_url: "",
            tech_stack: ["React", "Next.js", "Tailwind CSS", "Node.js"],
            category: "Featured",
            featured: true,
            display: true,
            sort_order: 1,
          },
          {
            id: "hgs-sportswear",
            title: "HGS Sportswear Showcase",
            description: "A premium e-commerce showcase.",
            thumbnail_url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800",
            live_url: "https://hgs-sportswear-showcase.lovable.app",
            github_url: "",
            tech_stack: ["E-commerce", "Framer Motion", "React"],
            category: "E-Commerce",
            featured: false,
            display: true,
            sort_order: 2,
          }
        ];
        setProjects(mock);
        setLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (err) throw err;
      setProjects(data || []);
    } catch (err: any) {
      setError("Failed to fetch projects. Please ensure the 'projects' table is initialized.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setActiveProject({
      title: "",
      description: "",
      thumbnail_url: "",
      live_url: "",
      github_url: "",
      tech_stack: [],
      category: "Featured",
      featured: false,
      display: true,
      sort_order: projects.length + 1,
    });
    setTechInput("");
    setIsEditing(true);
  };

  const handleOpenEdit = (project: Project) => {
    setActiveProject(project);
    setTechInput(project.tech_stack.join(", "));
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject) return;

    setError("");
    const parsedTech = techInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectToSave = {
      ...activeProject,
      tech_stack: parsedTech,
    };

    try {
      if (!supabase) {
        // Mock save local state
        if (projectToSave.id) {
          setProjects(projects.map((p) => p.id === projectToSave.id ? (projectToSave as Project) : p));
        } else {
          const newProj = {
            ...projectToSave,
            id: `proj-${Date.now()}`,
          } as Project;
          setProjects([...projects, newProj]);
        }
        setIsEditing(false);
        setActiveProject(null);
        return;
      }

      if (projectToSave.id) {
        // Update
        const { error: err } = await supabase
          .from("projects")
          .update(projectToSave)
          .eq("id", projectToSave.id);
        if (err) throw err;
      } else {
        // Insert
        const { error: err } = await supabase
          .from("projects")
          .insert([projectToSave]);
        if (err) throw err;
      }

      setIsEditing(false);
      setActiveProject(null);
      loadProjects();
    } catch (err: any) {
      setError(err.message || "Error saving project.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setError("");

    try {
      if (!supabase) {
        setProjects(projects.filter((p) => p.id !== id));
        return;
      }

      const { error: err } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (err) throw err;
      loadProjects();
    } catch (err: any) {
      setError(err.message || "Error deleting project.");
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = { ...project, featured: !project.featured };
      if (!supabase) {
        setProjects(projects.map((p) => p.id === project.id ? updated : p));
        return;
      }

      const { error: err } = await supabase
        .from("projects")
        .update({ featured: updated.featured })
        .eq("id", project.id);

      if (err) throw err;
      loadProjects();
    } catch (err: any) {
      setError("Error updating featured status.");
    }
  };

  const handleToggleDisplay = async (project: Project) => {
    try {
      const updated = { ...project, display: !project.display };
      if (!supabase) {
        setProjects(projects.map((p) => p.id === project.id ? updated : p));
        return;
      }

      const { error: err } = await supabase
        .from("projects")
        .update({ display: updated.display })
        .eq("id", project.id);

      if (err) throw err;
      loadProjects();
    } catch (err: any) {
      setError("Error updating display status.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;

    setIsUploading(true);
    setError("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;

      // Upload file to Supabase storage bucket 'media'
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      // Save to media metadata table
      await supabase.from("media").insert([{
        file_name: file.name,
        file_path: filePath,
        file_url: publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
      }]);

      setActiveProject((prev) => ({ ...prev, thumbnail_url: publicUrl }));
    } catch (err: any) {
      setError("Failed to upload thumbnail. Using manual URL input is recommended if 'media' storage bucket is not configured.");
    } finally {
      setIsUploading(false);
    }
  };

  const moveProject = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === projects.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const reorderedList = [...projects];

    // Swap sort orders
    const tempOrder = reorderedList[index].sort_order;
    reorderedList[index].sort_order = reorderedList[targetIndex].sort_order;
    reorderedList[targetIndex].sort_order = tempOrder;

    // Swap elements in list
    const tempProj = reorderedList[index];
    reorderedList[index] = reorderedList[targetIndex];
    reorderedList[targetIndex] = tempProj;

    setProjects(reorderedList);

    if (supabase) {
      try {
        await supabase
          .from("projects")
          .update({ sort_order: reorderedList[index].sort_order })
          .eq("id", reorderedList[index].id);
        await supabase
          .from("projects")
          .update({ sort_order: reorderedList[targetIndex].sort_order })
          .eq("id", reorderedList[targetIndex].id);
      } catch (err) {
        setError("Failed to sync new order with Supabase.");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Manage Projects</h1>
          <p className="text-white/60">Add, edit, reorder or highlight your works.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex gap-3 items-center">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor Modal */}
      {isEditing && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#080613] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">
                {activeProject.id ? "Edit Project" : "Add New Project"}
              </h3>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setActiveProject(null);
                }} 
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Title</label>
                  <input
                    type="text"
                    required
                    value={activeProject.title || ""}
                    onChange={(e) => setActiveProject({ ...activeProject, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Category</label>
                  <select
                    value={activeProject.category || "Featured"}
                    onChange={(e) => setActiveProject({ ...activeProject, category: e.target.value })}
                    className="w-full bg-[#0d0a1d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Description</label>
                <textarea
                  required
                  rows={3}
                  value={activeProject.description || ""}
                  onChange={(e) => setActiveProject({ ...activeProject, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Live URL */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Live URL</label>
                  <input
                    type="url"
                    required
                    value={activeProject.live_url || ""}
                    onChange={(e) => setActiveProject({ ...activeProject, live_url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">GitHub URL (Optional)</label>
                  <input
                    type="url"
                    value={activeProject.github_url || ""}
                    onChange={(e) => setActiveProject({ ...activeProject, github_url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="React, Next.js, Tailwind CSS"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Thumbnail Image URL / Upload */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-white/80 block">Thumbnail Image</label>
                
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-full flex-1">
                    <input
                      type="text"
                      required
                      placeholder="https://example.com/image.png"
                      value={activeProject.thumbnail_url || ""}
                      onChange={(e) => setActiveProject({ ...activeProject, thumbnail_url: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  
                  <div className="w-full md:w-auto flex items-center gap-2">
                    <label className="flex items-center justify-center gap-2 cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10 transition-colors py-3 px-6 rounded-xl font-bold text-sm select-none">
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {isUploading && <RefreshCw className="w-4 h-4 animate-spin text-primary" />}
                  </div>
                </div>

                {activeProject.thumbnail_url && (
                  <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                    <img 
                      src={activeProject.thumbnail_url} 
                      alt="Thumbnail Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeProject.featured || false}
                    onChange={(e) => setActiveProject({ ...activeProject, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 focus:outline-none"
                  />
                  <span className="text-sm font-semibold">Feature Project</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeProject.display ?? true}
                    onChange={(e) => setActiveProject({ ...activeProject, display: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 focus:outline-none"
                  />
                  <span className="text-sm font-semibold">Display Toggle</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="sticky bottom-0 bg-[#080613] z-10 flex justify-end gap-4 pt-4 pb-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setActiveProject(null);
                  }}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                >
                  <Save className="w-4 h-4" />
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List Table */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold">All Projects</h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-white/40 text-center py-16">No projects found. Add your first project.</p>
        ) : (
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-left text-xs font-bold text-white/40 uppercase tracking-wider">
                  <th className="p-6">Sort</th>
                  <th className="p-6">Thumbnail</th>
                  <th className="p-6">Details</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((proj, idx) => (
                  <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Sort controls */}
                    <td className="p-6">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        <button 
                          onClick={() => moveProject(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 hover:text-primary disabled:text-white/20 disabled:cursor-not-allowed"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => moveProject(idx, "down")}
                          disabled={idx === projects.length - 1}
                          className="p-1 hover:text-primary disabled:text-white/20 disabled:cursor-not-allowed"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    {/* Image */}
                    <td className="p-6">
                      <div className="w-20 h-12 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center relative">
                        {proj.thumbnail_url ? (
                          <img src={proj.thumbnail_url} alt={proj.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-white/30" />
                        )}
                      </div>
                    </td>

                    {/* Details */}
                    <td className="p-6">
                      <div className="space-y-1 max-w-sm">
                        <div className="font-bold text-base text-white flex items-center gap-2">
                          {proj.title}
                          {proj.live_url && (
                            <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="text-white/60 text-xs max-h-20 overflow-y-auto pr-1">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.tech_stack.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-white/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-6">
                      <span className="text-xs font-bold text-white/80 bg-white/10 border border-white/5 px-3 py-1 rounded-full">
                        {proj.category}
                      </span>
                    </td>

                    {/* Status Toggles */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Featured */}
                        <button
                          onClick={() => handleToggleFeatured(proj)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            proj.featured
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              : "bg-white/5 border-white/5 text-white/40 hover:text-white"
                          }`}
                          title={proj.featured ? "Featured Project" : "Not Featured"}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>

                        {/* Display */}
                        <button
                          onClick={() => handleToggleDisplay(proj)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            proj.display
                              ? "bg-primary/10 border-primary/20 text-primary"
                              : "bg-white/5 border-white/5 text-white/40 hover:text-white"
                          }`}
                          title={proj.display ? "Visible on Portfolio" : "Hidden"}
                        >
                          {proj.display ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="p-2 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
