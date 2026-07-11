import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Resume",
};

const RESUME_PATH = path.join(process.cwd(), "public", "resume.pdf");

export default function ResumePage() {
  const hasResume = fs.existsSync(RESUME_PATH);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Resume</h1>
          <p className="mt-2 text-muted">
            {hasResume
              ? "View or download my latest resume below."
              : "Resume coming soon."}
          </p>
        </div>
        {hasResume && (
          <a
            href="/resume.pdf"
            download
            className="shrink-0 rounded-full border border-foreground px-4 py-2 text-sm transition hover:bg-foreground hover:text-background"
          >
            Download PDF
          </a>
        )}
      </div>

      {hasResume ? (
        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            src="/resume.pdf"
            title="Resume"
            className="h-[80vh] w-full"
          />
        </div>
      ) : (
        <p className="text-muted">
          Add a file named{" "}
          <code className="rounded bg-border/50 px-1.5 py-0.5">
            resume.pdf
          </code>{" "}
          to the{" "}
          <code className="rounded bg-border/50 px-1.5 py-0.5">public</code>{" "}
          folder and it&apos;ll appear here automatically.
        </p>
      )}
    </div>
  );
}
