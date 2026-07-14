/// <reference types="vite/client" />

declare module "virtual:photo-manifest" {
  export interface PhotoStack { files: string[]; cover: number }
  export const photoStacks: PhotoStack[];
  export const PHOTOS_PER_PAGE: number;
  /** Full-resolution original (only load on explicit request). */
  export const photoSrc: (f: string) => string;
  /** Small grid thumbnail derivative (~500px wide). */
  export const photoThumb: (f: string) => string;
  /** Large display derivative (~2000px wide) for the lightbox. */
  export const photoLarge: (f: string) => string;
  export const photos: string[];
}
