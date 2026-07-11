import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Projects</h1>
        <p className="mt-2 text-muted">
          Things I&apos;ve built, in progress or shipped.
        </p>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted">Nothing here yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
