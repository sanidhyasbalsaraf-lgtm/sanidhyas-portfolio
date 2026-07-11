import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-muted">
          Things I&apos;ve built, in progress or shipped.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border border-t border-border">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex items-start gap-6 py-8 transition-colors duration-200 hover:bg-accent/5 sm:items-center"
            >
              <span className="hidden w-8 shrink-0 font-mono text-sm text-muted sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-text">
                    {project.title}
                  </h2>
                  {project.year && (
                    <span className="shrink-0 text-sm text-muted">
                      {project.year}
                    </span>
                  )}
                </div>
                <p className="line-clamp-2 max-w-xl leading-relaxed text-muted">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <span className="hidden shrink-0 text-2xl text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-text sm:block">
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
