"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { PROJECTS } from "@/components/sections/projects";

export function ImagePreloader() {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchAndPreload = async () => {
      try {
        let fetchUrls = PROJECTS.map(p => p.image);
        if (supabase) {
          const { data, error } = await supabase
            .from("projects")
            .select("thumbnail_url")
            .order("sort_order", { ascending: true });
          if (!error && data && data.length > 0) {
            fetchUrls = data.map(p => p.thumbnail_url).filter(Boolean);
          }
        }
        if (mounted) setUrls(fetchUrls);
      } catch (e) {
        // silently ignore errors
      }
    };

    const triggerPreload = () => {
      // Delay slightly to ensure main thread is free and rendering is complete
      setTimeout(fetchAndPreload, 1500);
    };

    if (document.readyState === "complete") {
      triggerPreload();
    } else {
      window.addEventListener("load", triggerPreload);
      return () => window.removeEventListener("load", triggerPreload);
    }

    return () => { mounted = false; };
  }, []);

  if (urls.length === 0) return null;

  return (
    <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", zIndex: -1, opacity: 0, pointerEvents: "none" }}>
      {urls.map((url, idx) => (
        <Image
          key={`preload-${idx}`}
          src={url}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />
      ))}
    </div>
  );
}
