import type { Metadata } from "next";
import { getPhotos } from "@/lib/photos";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata: Metadata = {
  title: "Photography",
};

export default function PhotographyPage() {
  const photos = getPhotos();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Photography</h1>
        <p className="mt-2 text-muted">
          A selection of photos I&apos;ve taken.
        </p>
      </div>
      {photos.length === 0 ? (
        <p className="text-muted">
          No photos yet — drop image files into{" "}
          <code className="rounded bg-border/50 px-1.5 py-0.5">
            public/photos
          </code>{" "}
          and they&apos;ll show up here automatically.
        </p>
      ) : (
        <PhotoGallery photos={photos} />
      )}
    </div>
  );
}
