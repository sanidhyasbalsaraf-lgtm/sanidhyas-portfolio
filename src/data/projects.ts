// Add a new object to this array each time you want a new project on the site.
// Order here = display order (top of array shows first).
export type Project = {
  title: string;
  description: string;
  tags: string[];
  highlights?: string[]; // optional bullet points for more detail
  link?: string; // live demo URL
  repo?: string; // source code URL
  year?: string;
};

export const projects: Project[] = [
  {
    title: "LinkedIn Job & Outreach Copilot",
    description:
      "A Chrome extension that pulls the job description and hiring-manager info off a LinkedIn job posting, then drafts a connection note, InMail, or cover-note reply in your own writing style using OpenAI.",
    highlights: [
      "Floating on-page panel plus a toolbar popup — auto-scans the job description and hiring-manager info directly off the LinkedIn page",
      "Drafts three message types (connection note, InMail, job-reply cover note) styled to your own writing, using 3-5 sample messages you provide",
      "One-click insert types the draft straight into LinkedIn's own message box, or copy it to paste manually",
      "API key and writing-style samples stay in local browser storage only — never synced or sent anywhere except api.openai.com",
      "Manifest V3 with a configurable Settings page: model choice, tone, style notes, and a LinkedIn-matched or editorial visual theme with light/dark mode",
    ],
    tags: ["Chrome Extension", "JavaScript", "Manifest V3", "OpenAI API"],
    repo: "https://github.com/sanidhyasbalsaraf-lgtm/linkedin-copilot-extension",
    year: "2026",
  },
  {
    title: "Portfolio Website",
    description:
      "This site — a Next.js portfolio for showcasing projects, photography, and my resume, deployed on Vercel.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/sanidhyasbalsaraf-lgtm/sanidhyas-portfolio",
    year: "2026",
  },
];
