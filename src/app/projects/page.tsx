import dynamic from 'next/dynamic';
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const ProjectsSection = dynamic(() => import("@/components/sections/projects").then(mod => mod.ProjectsSection));
const ProcessSection = dynamic(() => import("@/components/sections/process").then(mod => mod.ProcessSection));

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-20">
      <CustomCursor />
      <ScrollProgress />
      
      <div className="flex-1 w-full flex flex-col">
        <ProjectsSection />
        <ProcessSection />
      </div>
    </main>
  );
}
