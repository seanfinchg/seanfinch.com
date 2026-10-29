/// <reference types="vite/client" />

declare module "virtual:photo-manifest" {
  export interface PhotoStack {
    /** Shared base filename — stable key for URLs and photo-meta.json. */
    id: string;
    files: string[];
    cover: number;
    /** Cover file pixel dimensions. */
    w: number;
    h: number;
  }
  export const photoStacks: PhotoStack[];
  export const PHOTOS_PER_PAGE: number;
  /** Full-resolution original (only load on explicit request). */
  export const photoSrc: (f: string) => string;
  /** Small grid thumbnail derivative (~500px wide). */
  export const photoThumb: (f: string) => string;
  /** Medium display derivative (~1200px wide); lightbox srcset on small/1x screens. */
  export const photoMedium: (f: string) => string;
  /** Large display derivative (~2000px wide) for the lightbox. */
  export const photoLarge: (f: string) => string;
  export const photos: string[];
}
