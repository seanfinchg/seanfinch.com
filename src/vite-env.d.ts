/// <reference types="vite/client" />

declare module "virtual:photo-manifest" {
  export type PhotoStack = { files: string[] };
  export const photoStacks: PhotoStack[];
  export const PHOTOS_PER_PAGE: number;
  export const photoSrc: (f: string) => string;
  export const photos: string[];
}
