"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? photos[activeIndex] : null;

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
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 [&>*]:mb-4">
        {photos.map((photo, index) => (
          <figure key={photo.src}>
            <button
              onClick={() => setActiveIndex(index)}
              className="block w-full overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="h-auto w-full object-cover transition hover:opacity-90"
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
            {photo.caption && (
              <figcaption className="mt-2 text-sm text-muted">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 text-2xl text-white/80 hover:text-white"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              show(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-4 text-3xl text-white/70 hover:text-white"
          >
            ‹
          </button>
          <div
            className="flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={1600}
              height={1200}
              className="max-h-[calc(85vh-2.5rem)] w-auto max-w-full rounded-lg object-contain"
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
            className="absolute right-4 text-3xl text-white/70 hover:text-white"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
