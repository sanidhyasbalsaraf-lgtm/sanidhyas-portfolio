"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type GalleryImage = { src: string; caption: string };

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export default function ProjectGallery({
  title,
  images,
  width,
  height,
  layout = "grid",
}: {
  title: string;
  images: GalleryImage[];
  width: number;
  height: number;
  layout?: "grid" | "single";
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? images[activeIndex] : null;

  function close() {
    setActiveIndex(null);
  }

  function show(delta: number) {
    setActiveIndex((current) =>
      current === null ? null : (current + delta + images.length) % images.length,
    );
  }

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(-1);
      else if (e.key === "ArrowRight") show(1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        {title}
      </h2>
      <div
        className={
          layout === "single"
            ? "flex flex-col gap-6"
            : "grid grid-cols-1 gap-6 sm:grid-cols-2"
        }
      >
        {images.map((image, index) => (
          <figure key={image.src} className="flex flex-col gap-2">
            <button
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border transition-colors duration-200 hover:border-accent"
            >
              <Image
                src={image.src}
                alt={image.caption}
                width={width}
                height={height}
                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ExpandIcon />
              </span>
            </button>
            <figcaption className="text-sm text-muted">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95 p-4"
          onClick={close}
        >
          <Image
            key={`${active.src}-backdrop`}
            src={active.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-25 blur-3xl"
          />
          <span className="absolute left-6 top-6 z-10 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur-sm">
            {(activeIndex ?? 0) + 1} / {images.length}
          </span>
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 transition-all duration-200 hover:scale-110 hover:bg-accent hover:text-accent-foreground"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              show(-1);
            }}
            aria-label="Previous image"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-3xl text-white/70 transition-all duration-200 hover:scale-110 hover:bg-accent hover:text-accent-foreground"
          >
            ‹
          </button>
          <div
            key={active.src}
            className="animate-fade-in-up relative z-10 flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.caption}
              width={1920}
              height={1080}
              className="max-h-[calc(85vh-2.5rem)] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-sm text-white/80">{active.caption}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              show(1);
            }}
            aria-label="Next image"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-3xl text-white/70 transition-all duration-200 hover:scale-110 hover:bg-accent hover:text-accent-foreground"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
