import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border p-6 transition hover:border-foreground/40">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium">{project.title}</h3>
        {project.year && (
          <span className="shrink-0 text-sm text-muted">{project.year}</span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
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
      {(project.link || project.repo) && (
        <div className="mt-1 flex gap-4 text-sm">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
