// Add a new object to this array each time you want a new project on the site.
// Order here = display order (top of array shows first).
// slug becomes the URL: /projects/<slug> - keep it stable once published.
export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  highlights?: string[]; // shown on the project's own detail page
  image?: string; // optional path under /public, e.g. "/projects/my-shot.jpg"
  gallery?: { src: string; caption: string }[]; // optional captioned screenshot walkthrough
  link?: string; // live demo URL
  repo?: string; // source code URL
  year?: string;
};

export const projects: Project[] = [
  {
    slug: "linkedin-job-outreach-copilot",
    title: "LinkedIn Job & Outreach Copilot",
    description:
      "A Chrome extension that pulls the job description and hiring-manager info off a LinkedIn job posting, then drafts a connection note, InMail, or cover-note reply in your own writing style using OpenAI.",
    highlights: [
      "Floating on-page panel plus a toolbar popup that auto-scans the job description and hiring-manager info directly off the LinkedIn page",
      "Drafts three message types (connection note, InMail, job-reply cover note) styled to your own writing, using 3-5 sample messages you provide",
      "One-click insert types the draft straight into LinkedIn's own message box, or copy it to paste manually",
      "API key and writing-style samples stay in local browser storage only, never synced or sent anywhere except api.openai.com",
      "Manifest V3 with a configurable Settings page: model choice, tone, style notes, and a LinkedIn-matched or editorial visual theme with light/dark mode",
    ],
    gallery: [
      {
        src: "/projects/linkedin-copilot-onboarding-1-welcome.png",
        caption: "1. Welcome - what the extension does and how it works",
      },
      {
        src: "/projects/linkedin-copilot-onboarding-2-connect.png",
        caption: "2. Connect - add an OpenAI API key, stored locally only",
      },
      {
        src: "/projects/linkedin-copilot-onboarding-3-voice.png",
        caption: "3. Your voice - background, writing samples, and tone",
      },
      {
        src: "/projects/linkedin-copilot-onboarding-4-appearance.png",
        caption: "4. Appearance - pick a look and jump into LinkedIn Jobs",
      },
    ],
    tags: ["Chrome Extension", "JavaScript", "Manifest V3", "OpenAI API"],
    repo: "https://github.com/sanidhyasbalsaraf-lgtm/linkedin-copilot-extension",
    year: "2026",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description:
      "This site is a Next.js portfolio for showcasing projects, photography, and my resume, deployed on Vercel.",
    highlights: [
      "Content lives in plain data files (src/data) and public/photos, so new projects and photos ship without touching UI code",
      "Dark and light mode with no flash on load, an accent color tuned for WCAG AA contrast in both modes",
      "Photography gallery with a featured banner, hover-zoom grid, and a lightbox with keyboard navigation",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/sanidhyasbalsaraf-lgtm/sanidhyas-portfolio",
    year: "2026",
  },
];
