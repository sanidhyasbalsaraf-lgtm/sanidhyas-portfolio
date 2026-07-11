import fs from "fs";
import path from "path";
import { photoCaptions } from "@/data/photo-captions";

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function filenameToAlt(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").trim();
}

// Drop image files into /public/photos and they'll show up here automatically —
// no code changes needed. Add an entry to src/data/photo-captions.ts to caption one.
export function getPhotos(): Photo[] {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  return fs
    .readdirSync(PHOTOS_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => ({
      src: `/photos/${file}`,
      alt: photoCaptions[file] ?? filenameToAlt(file),
      caption: photoCaptions[file],
    }));
}
