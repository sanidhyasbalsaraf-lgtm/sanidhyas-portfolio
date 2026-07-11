import Link from "next/link";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-5">
        <p className="animate-fade-in-up text-sm font-medium tracking-wide text-accent-text">
          {site.location}
        </p>
        <h1
          className="animate-fade-in-up text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {site.name}
        </h1>
        <p
          className="animate-fade-in-up text-lg text-muted"
          style={{ animationDelay: "140ms" }}
        >
          {site.role}
        </p>
        <p
          className="animate-fade-in-up max-w-xl leading-relaxed"
          style={{ animationDelay: "200ms" }}
        >
          {site.bio}
        </p>
        <div
          className="animate-fade-in-up mt-3 flex gap-4 text-sm"
          style={{ animationDelay: "260ms" }}
        >
          <Link
            href="/projects"
            className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-foreground shadow-[0_0_0_0_var(--accent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_var(--accent)] active:translate-y-0"
          >
            View projects
          </Link>
          <Link
            href="/photography"
            className="rounded-full border border-border px-5 py-2.5 font-medium text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-text active:translate-y-0"
          >
            See photography
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Recent projects
            </h2>
            <Link
              href="/projects"
              className="link-underline text-sm text-muted hover:text-accent-text"
            >
              View all →
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {featured.map((project) => (
              <li key={project.title} className="group py-5">
                <Link href="/projects" className="block">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-accent-text">
                      {project.title}
                    </h3>
                    {project.year && (
                      <span className="shrink-0 text-sm text-muted">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {project.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
