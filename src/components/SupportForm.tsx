"use client";

import { useState } from "react";
import { site } from "@/data/site";

const ISSUE_MAX_LENGTH = 500;

export default function SupportForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [issue, setIssue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Support request from ${name || "website visitor"}`,
    );
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      mobile ? `Mobile: ${mobile}` : null,
      "",
      "Issue:",
      issue,
    ].filter((line): line is string => line !== null);
    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mobile" className="text-sm font-medium">
          Mobile number <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="mobile"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="issue" className="text-sm font-medium">
          What issue are you facing?
        </label>
        <textarea
          id="issue"
          required
          rows={5}
          maxLength={ISSUE_MAX_LENGTH}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className={inputClasses}
        />
        <p className="text-xs text-muted">
          {issue.length}/{ISSUE_MAX_LENGTH} — keep it concise, since very long
          messages can get cut off by some email apps.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="w-fit rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-foreground shadow-[0_0_0_0_var(--accent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_var(--accent)] active:translate-y-0"
        >
          Submit
        </button>
        <p className="text-xs text-muted">
          This opens your email app with the message pre-filled — hit send
          there to reach me.
        </p>
      </div>
    </form>
  );
}
