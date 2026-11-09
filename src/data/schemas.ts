// Shapes of the hand-maintained photo data files. vite.config.ts parses every
// file with these schemas when the build starts, so a typo fails the build
// instead of shipping. App code imports only the inferred types, which keeps
// zod out of the browser bundle.
import { z } from "zod";

/** photo-hidden.json: filenames kept in the repo but left out of the gallery. */
export const photoHiddenSchema = z.array(z.string());

/** One photo's EXIF in photo-exif.json; every field may be missing. */
export const exifEntrySchema = z.object({
  Make: z.string().optional(),
  Model: z.string().optional(),
  LensModel: z.string().optional(),
  FNumber: z.number().optional(),
  ExposureTime: z.number().optional(),
  ISO: z.number().optional(),
  FocalLength: z.number().optional(),
  DateTimeOriginal: z.string().optional(),
});
export type ExifEntry = z.infer<typeof exifEntrySchema>;

/** photo-exif.json: EXIF keyed by .webp filename. */
export const photoExifSchema = z.record(z.string(), exifEntrySchema);

/** One stack's hand-written entry in photo-meta.json. Every field is optional. */
export const photoMetaSchema = z.strictObject({
  title: z.string().optional(),
  alt: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
export type PhotoMeta = z.infer<typeof photoMetaSchema>;

/** photo-meta.json: the featured stack, tag labels (in chip order) and per-stack entries. */
export const photoMetaDbSchema = z.strictObject({
  featured: z.string().optional(),
  tags: z.record(z.string(), z.string()),
  photos: z.record(z.string(), photoMetaSchema),
});
export type PhotoMetaDb = z.infer<typeof photoMetaDbSchema>;
