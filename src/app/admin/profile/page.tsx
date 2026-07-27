"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  role: string;
  year: string;
  description: string;
}

interface Profile {
  id: string;
  name: string;
  role: string;
  headline: string;
  about: string;
  phone: string;
  email: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  social_links: {
    github?: string;
    linkedin?: string;
    vercel?: string;
    twitter?: string;
  };
}

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<Profile>({
    id: "00000000-0000-0000-0000-000000000001",
    name: "Abhishek Srivastav",
    role: "Founder & Full Stack Web Developer",
    headline: "Full Stack Web Developer building premium websites and web applications for businesses.",
    about: "Founder of Abhi Technologies. Specialized in business websites, e-commerce stores, portfolio websites, admin dashboards and custom web applications.",
    phone: "+91 8140353442",
    email: "abhitechnologies262@gmail.com",
    education: [],
    experience: [],
    skills: [],
    social_links: {},
  });

  const [activeTab, setActiveTab] = useState<"personal" | "bio" | "edu-exp" | "skills">("personal");
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Helper inputs for adding arrays
  const [newEdu, setNewEdu] = useState<Education>({ institution: "", degree: "", year: "" });
  const [newExp, setNewExp] = useState<Experience>({ company: "", role: "", year: "", description: "" });
  const [skillInput, setSkillInput] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      if (!supabase) {
        // Use default mock
        setLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("profile")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000001")
        .single();

      if (err) {
        // If not found, create a default row
        if (err.code === "PGRST116") {
          const { error: insertErr } = await supabase
            .from("profile")
            .insert([profile]);
          if (insertErr) throw insertErr;
        } else {
          throw err;
        }
      } else if (data) {
        setProfile({
          ...data,
          education: data.education || [],
          experience: data.experience || [],
          skills: data.skills || [],
          social_links: data.social_links || {},
        });
      }
    } catch (err: any) {
      setError("Unable to load profile from database. Ensure profile table matches requirements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!supabase) {
        // Save in local state
        setSuccess(true);
        setSaveLoading(false);
        return;
      }

      const { error: err } = await supabase
        .from("profile")
        .upsert(profile);

      if (err) throw err;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error saving profile details.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAddEducation = () => {
    if (!newEdu.institution || !newEdu.degree || !newEdu.year) return;
    setProfile({
      ...profile,
      education: [...profile.education, newEdu],
    });
    setNewEdu({ institution: "", degree: "", year: "" });
  };

  const handleRemoveEducation = (index: number) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, idx) => idx !== index),
    });
  };

  const handleAddExperience = () => {
    if (!newExp.company || !newExp.role || !newExp.year) return;
    setProfile({
      ...profile,
      experience: [...profile.experience, newExp],
    });
    setNewExp({ company: "", role: "", year: "", description: "" });
  };

  const handleRemoveExperience = (index: number) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((_, idx) => idx !== index),
    });
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!profile.skills.includes(skillInput.trim())) {
        setProfile({
          ...profile,
          skills: [...profile.skills, skillInput.trim()],
        });
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Edit Profile</h1>
          <p className="text-white/60">Configure your professional details, credentials and work history.</p>
        </div>
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
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Tabs header */}
          <div className="flex border-b border-white/10 gap-2 pb-px overflow-x-auto">
            {[
              { id: "personal", label: "Personal Details" },
              { id: "bio", label: "About & headline" },
              { id: "edu-exp", label: "Education & Career" },
              { id: "skills", label: "Skills & Socials" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap
                  ${activeTab === tab.id 
                    ? "border-primary text-white" 
                    : "border-transparent text-white/40 hover:text-white"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
            {/* Tab: Personal */}
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Job Title / Role</label>
                  <input
                    type="text"
                    required
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Tab: Bio */}
            {activeTab === "bio" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Headline Summary</label>
                  <input
                    type="text"
                    required
                    value={profile.headline}
                    onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">Detailed Bio (About)</label>
                  <textarea
                    required
                    rows={6}
                    value={profile.about}
                    onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Tab: Education & Career */}
            {activeTab === "edu-exp" && (
              <div className="space-y-8">
                {/* Education section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Education History</h4>
                  
                  <div className="space-y-3">
                    {profile.education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                        <div>
                          <div className="font-bold text-sm text-white">{edu.institution}</div>
                          <span className="text-xs text-white/60">{edu.degree} • {edu.year}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(idx)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <input
                      type="text"
                      placeholder="School / University"
                      value={newEdu.institution}
                      onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                    />
                    <input
                      type="text"
                      placeholder="Degree / Major"
                      value={newEdu.degree}
                      onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Year (e.g. 2020-2024)"
                        value={newEdu.year}
                        onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white flex-1"
                      />
                      <button
                        type="button"
                        onClick={handleAddEducation}
                        className="px-4 bg-primary rounded-xl text-white font-bold text-sm hover:bg-primary/90 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Experience section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Work Experience</h4>

                  <div className="space-y-3">
                    {profile.experience.map((exp, idx) => (
                      <div key={idx} className="flex justify-between items-start p-4 bg-white/5 border border-white/5 rounded-xl">
                        <div className="space-y-1">
                          <div className="font-bold text-sm text-white">{exp.company}</div>
                          <div className="text-xs font-semibold text-primary">{exp.role} ({exp.year})</div>
                          <p className="text-xs text-white/60">{exp.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(idx)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={newExp.company}
                        onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                      />
                      <input
                        type="text"
                        placeholder="Role / Designation"
                        value={newExp.role}
                        onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. 2022 - Present)"
                        value={newExp.year}
                        onChange={(e) => setNewExp({ ...newExp, year: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <textarea
                        placeholder="Job description / Achievements"
                        rows={2}
                        value={newExp.description}
                        onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white flex-1"
                      />
                      <button
                        type="button"
                        onClick={handleAddExperience}
                        className="px-4 bg-primary rounded-xl text-white font-bold text-sm hover:bg-primary/90 transition-colors self-end h-10"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Skills & Socials */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                {/* Skills tags */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/80">Skills (Press Enter to add)</label>
                  <input
                    type="text"
                    placeholder="Type skill name and press Enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {profile.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-white/40 hover:text-white text-[10px]"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h4 className="text-base font-bold text-white">Social Network Profiles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white/60">GitHub URL</span>
                      <input
                        type="url"
                        value={profile.social_links.github || ""}
                        onChange={(e) => setProfile({
                          ...profile,
                          social_links: { ...profile.social_links, github: e.target.value }
                        })}
                        placeholder="https://github.com/..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white/60">LinkedIn URL</span>
                      <input
                        type="url"
                        value={profile.social_links.linkedin || ""}
                        onChange={(e) => setProfile({
                          ...profile,
                          social_links: { ...profile.social_links, linkedin: e.target.value }
                        })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white/60">Vercel Deployments URL</span>
                      <input
                        type="url"
                        value={profile.social_links.vercel || ""}
                        onChange={(e) => setProfile({
                          ...profile,
                          social_links: { ...profile.social_links, vercel: e.target.value }
                        })}
                        placeholder="https://vercel.com/..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white/60">Twitter / X URL</span>
                      <input
                        type="url"
                        value={profile.social_links.twitter || ""}
                        onChange={(e) => setProfile({
                          ...profile,
                          social_links: { ...profile.social_links, twitter: e.target.value }
                        })}
                        placeholder="https://x.com/..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm focus:outline-none text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saveLoading}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50"
            >
              {saveLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Profile Info
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
