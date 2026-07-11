"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

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

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? photos[activeIndex] : null;
  const [featured, ...rest] = photos;

  function close() {
    setActiveIndex(null);
  }

  function show(delta: number) {
    setActiveIndex((current) =>
      current === null ? null : (current + delta + photos.length) % photos.length,
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

  return (
    <>
      <div className="flex flex-col gap-8">
        {featured && (
          <button
            onClick={() => setActiveIndex(0)}
            className="animate-fade-in-up group relative block h-[60vw] max-h-[480px] min-h-[240px] w-full overflow-hidden rounded-2xl border border-border text-left"
          >
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground">
              Featured
            </span>
            {featured.caption && (
              <span className="font-display absolute bottom-5 left-5 right-5 text-xl font-semibold text-white drop-shadow-sm sm:text-2xl">
                {featured.caption}
              </span>
            )}
          </button>
        )}

        {rest.length > 0 && (
          <div className="columns-1 gap-4 sm:columns-2 md:columns-3 [&>*]:mb-4">
            {rest.map((photo, index) => (
              <figure
                key={photo.src}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }}
              >
                <button
                  onClick={() => setActiveIndex(index + 1)}
                  className="group relative block w-full overflow-hidden rounded-xl border border-border transition-colors duration-200 hover:border-accent"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-1 font-mono text-[11px] text-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ExpandIcon />
                  </span>
                </button>
                {photo.caption && (
                  <figcaption className="mt-2 text-sm text-muted">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
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
            {(activeIndex ?? 0) + 1} / {photos.length}
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
            aria-label="Previous photo"
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
              alt={active.alt}
              width={1600}
              height={1200}
              className="max-h-[calc(85vh-2.5rem)] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            {active.caption && (
              <p className="text-sm text-white/80">{active.caption}</p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              show(1);
            }}
            aria-label="Next photo"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-3xl text-white/70 transition-all duration-200 hover:scale-110 hover:bg-accent hover:text-accent-foreground"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
