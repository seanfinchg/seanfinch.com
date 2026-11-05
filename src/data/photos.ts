import type { PhotoStack } from "virtual:photo-manifest";
import { photoStacks } from "virtual:photo-manifest";
import metaDb from "./photo-meta.json";
import type { PhotoMeta, PhotoMetaDb } from "./schemas";

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
 * (the shared base filename, e.g. "DSC_8875"). A photo with no entry still
 * shows up, it just has no title/tags. The build validates the file.
 */
export type { PhotoMeta } from "./schemas";

const db: PhotoMetaDb = metaDb;

export const PHOTO_TAGS: readonly (readonly [string, string])[] = Object.entries(db.tags);

export const photoMeta = (id: string): PhotoMeta => db.photos[id] ?? {};

export const photoTitle = (id: string): string => photoMeta(id).title ?? "Untitled";

export const photoAlt = (id: string): string =>
  photoMeta(id).alt ?? photoMeta(id).title ?? "Photograph by Sean Finch";

/** The stack featured in the hero; falls back to the newest stack. */
export const featuredStack: PhotoStack | undefined =
  photoStacks.find((s) => s.id === db.featured) ?? photoStacks[0];
