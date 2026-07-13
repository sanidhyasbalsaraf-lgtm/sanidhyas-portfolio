"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/photography", label: "Photography" },
  { href: "/resume", label: "Resume" },
  { href: "/support", label: "Support" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold tracking-tight text-accent-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          >
            {site.initials}
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <ul className="flex gap-6 text-sm font-medium text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline transition hover:text-accent-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-200 hover:border-accent hover:bg-accent/10 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                className={`absolute block h-0.5 w-4 bg-foreground transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-4 bg-foreground transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-4 bg-foreground transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border sm:hidden">
          <ul className="mx-auto flex max-w-3xl flex-col px-6 py-2 text-sm font-medium text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 transition hover:text-accent-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
