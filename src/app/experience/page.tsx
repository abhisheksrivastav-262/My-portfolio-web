import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const ExperienceSection = dynamic(() => import("@/components/sections/experience").then(mod => mod.ExperienceSection));
const EducationSection = dynamic(() => import("@/components/sections/education").then(mod => mod.EducationSection));
const CertificationsSection = dynamic(() => import("@/components/sections/certifications").then(mod => mod.CertificationsSection));
const AchievementsSection = dynamic(() => import("@/components/sections/achievements").then(mod => mod.AchievementsSection));
const GithubStatsSection = dynamic(() => import("@/components/sections/github-stats").then(mod => mod.GithubStatsSection));
const CodingProfilesSection = dynamic(() => import("@/components/sections/coding-profiles").then(mod => mod.CodingProfilesSection));

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />
      
      <div className="flex-1 w-full flex flex-col">
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <AchievementsSection />
        <GithubStatsSection />
        <CodingProfilesSection />
      </div>
    </main>
  );
}
