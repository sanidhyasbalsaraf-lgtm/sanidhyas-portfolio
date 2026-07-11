import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? project.title : "Project" };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/projects"
        className="link-underline w-fit text-sm font-medium text-muted hover:text-accent-text"
      >
        ← All projects
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          {project.year && (
            <span className="text-sm text-muted">{project.year}</span>
          )}
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {project.description}
        </p>
      </div>

      {(project.link || project.repo) && (
        <div className="flex gap-3 text-sm font-medium">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-foreground shadow-[0_0_0_0_var(--accent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_var(--accent)] active:translate-y-0"
            >
              View live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 font-medium text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-text active:translate-y-0"
            >
              View source
            </a>
          )}
        </div>
      )}

      {project.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <div className="flex flex-col gap-4 border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            How it works
          </h2>
          <ul className="flex flex-col gap-4">
            {project.highlights.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed text-muted">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-border pt-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
