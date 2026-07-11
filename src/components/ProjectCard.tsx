import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.25)]">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        {project.year && (
          <span className="shrink-0 text-sm text-muted">{project.year}</span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      {project.highlights && project.highlights.length > 0 && (
        <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-muted">
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
      {project.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors group-hover:border-accent/40 group-hover:text-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      {(project.link || project.repo) && (
        <div className="mt-1 flex gap-4 text-sm font-medium">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-accent"
            >
              Live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-accent"
            >
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
