import Link from "next/link";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-4">
        <p className="text-sm text-muted">{site.location}</p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {site.name}
        </h1>
        <p className="text-lg text-muted">{site.role}</p>
        <p className="max-w-xl leading-relaxed">{site.bio}</p>
        <div className="mt-2 flex gap-4 text-sm">
          <Link
            href="/projects"
            className="rounded-full border border-foreground px-4 py-2 transition hover:bg-foreground hover:text-background"
          >
            View projects
          </Link>
          <Link
            href="/photography"
            className="rounded-full border border-border px-4 py-2 text-muted transition hover:border-foreground hover:text-foreground"
          >
            See photography
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
              Recent projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted hover:text-foreground"
            >
              View all →
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {featured.map((project) => (
              <li key={project.title} className="py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">{project.title}</h3>
                  {project.year && (
                    <span className="shrink-0 text-sm text-muted">
                      {project.year}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">
                  {project.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
