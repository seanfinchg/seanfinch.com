import type { PhotoStack } from "virtual:photo-manifest";
import { photoStacks } from "virtual:photo-manifest";
import metaDb from "./photo-meta.json";

export type { PhotoStack } from "virtual:photo-manifest";
export {
  photoStacks,
  photos,
  PHOTOS_PER_PAGE,
  photoSrc,
  photoThumb,
  photoMedium,
  photoLarge,
} from "virtual:photo-manifest";

/**
 * Hand-written per-stack metadata from photo-meta.json, keyed by stack id
 * (the shared base filename, e.g. "DSC_8875"). Every field is optional — a
 * photo with no entry still shows up, it just has no title/tags.
 */
export interface PhotoMeta {
  title?: string;
  alt?: string;
  tags?: string[];
}

interface PhotoMetaDb {
  featured?: string;
  /** Tag id → display label, in the order the filter chips appear. */
  tags: Record<string, string>;
  photos: Record<string, PhotoMeta>;
}

const db = metaDb as PhotoMetaDb;

export const PHOTO_TAGS: readonly (readonly [string, string])[] = Object.entries(db.tags);

export const photoMeta = (id: string): PhotoMeta => db.photos[id] ?? {};

export const photoTitle = (id: string): string => photoMeta(id).title ?? "Untitled";

export const photoAlt = (id: string): string =>
  photoMeta(id).alt ?? photoMeta(id).title ?? "Photograph by Sean Finch";

/** The stack featured in the hero; falls back to the newest stack. */
export const featuredStack: PhotoStack | undefined =
  photoStacks.find((s) => s.id === db.featured) ?? photoStacks[0];
