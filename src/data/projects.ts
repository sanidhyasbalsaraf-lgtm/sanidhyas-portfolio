// Add a new object to this array each time you want a new project on the site.
// Order here = display order (top of array shows first).
export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string; // live demo URL
  repo?: string; // source code URL
  year?: string;
};

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "This site — a Next.js portfolio for showcasing projects, photography, and my resume, deployed on Vercel.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/sanidhyasbalsaraf-lgtm/sanidhyas-portfolio",
    year: "2026",
  },
];
