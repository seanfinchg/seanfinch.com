import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransformWrapper, TransformComponent, type ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import { useTheme } from "../contexts/themeContext";
import { getThemeClasses } from "../utils/themeUtils";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { photoStacks, PHOTOS_PER_PAGE, photoSrc } from "../data/photos";
import exifDb from "../data/photo-exif.json";

const formatShutter = (t: number | undefined): string => {
  if (t == null) return "—";
  if (t >= 1) return `${t}s`;
  return `1/${Math.round(1 / t)}s`;
};

const formatDateTime = (d: Date | string | undefined): string => {
  if (!d) return "—";
  try {
    const date = typeof d === "string" ? new Date(d) : d;
    const datePart = date.toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    return `${datePart} · ${timePart}`;
  } catch { return "—"; }
};

const versionLabel = (filename: string, idx: number, total: number): string => {
  if (total === 2) return filename.toLowerCase().includes("edit") ? "Edited" : "Original";
  return String(idx + 1);
};

const ExifCell: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] uppercase tracking-widest text-neutral-600">{label}</span>
    <span className="text-neutral-300 text-xs font-semibold break-words leading-snug">{value}</span>
  </div>
);

const PhotoTile: React.FC<{ filename: string; stackCount: number; onClick: () => void }> = ({
  filename, stackCount, onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg aspect-[3/2] bg-neutral-800
        cursor-pointer hover:ring-2 hover:ring-amber-400/40 transition-all duration-200 focus:outline-none"
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-neutral-800" />}
      <img
        src={photoSrc(filename)}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-300
          group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

      {stackCount > 1 && (
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1
          bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/70 shrink-0">
            <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            <rect x="1.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75" />
            <rect x="0.5" y="0.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <span className="text-white text-[10px] font-monospace font-semibold leading-none">{stackCount}</span>
        </div>
      )}
    </button>
  );
};

type LightboxState = { s: number; v: number };

const Photography: React.FC = () => {
  const { theme } = useTheme();
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);
  const zoomScaleRef = useRef(1);

  const totalPages = Math.ceil(photoStacks.length / PHOTOS_PER_PAGE);
  const pageStacks = photoStacks.slice(page * PHOTOS_PER_PAGE, (page + 1) * PHOTOS_PER_PAGE);
  const totalPhotos = photoStacks.reduce((sum, s) => sum + s.files.length, 0);

  const currentStack = lightbox !== null ? photoStacks[lightbox.s] : null;
  const currentFile = currentStack ? currentStack.files[lightbox!.v] : null;

  const exif = currentFile
    ? (exifDb[currentFile as keyof typeof exifDb] ?? {}) as Record<string, unknown>
    : {};

  const make = exif.Make as string | undefined;
  const model = exif.Model as string | undefined;
  const cameraLabel = make && model
    ? `${make.replace("NIKON CORPORATION", "Nikon")} ${model.replace("NIKON ", "")}`
    : "";
  const lensLabel = (exif.LensModel as string | undefined) ?? "";
  const aperture = exif.FNumber != null ? `f/${exif.FNumber}` : "—";
  const shutter = formatShutter(exif.ExposureTime as number | undefined);
  const iso = exif.ISO != null ? String(exif.ISO) : "—";
  const focal = exif.FocalLength != null ? `${exif.FocalLength}mm` : "—";
  const dateTaken = formatDateTime(exif.DateTimeOriginal as Date | string | undefined);

  useEffect(() => { document.title = "Photography - Sean Finch"; }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft" && zoomScaleRef.current <= 1) {
        transformRef.current?.resetTransform(0);
        setLightbox((lb) => lb && lb.s > 0 ? { s: lb.s - 1, v: 0 } : lb);
      }
      if (e.key === "ArrowRight" && zoomScaleRef.current <= 1) {
        transformRef.current?.resetTransform(0);
        setLightbox((lb) => lb && lb.s < photoStacks.length - 1 ? { s: lb.s + 1, v: 0 } : lb);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  // Preload covers of adjacent stacks
  useEffect(() => {
    if (lightbox === null) return;
    [-2, -1, 1, 2, 3].forEach((offset) => {
      const idx = lightbox.s + offset;
      if (idx >= 0 && idx < photoStacks.length) {
        photoStacks[idx].files.forEach((f) => {
          const img = new Image();
          img.src = photoSrc(f);
        });
      }
    });
  }, [lightbox?.s]);

  useEffect(() => {
    const next = (page + 1) * PHOTOS_PER_PAGE;
    if (next >= photoStacks.length) return;
    const timer = setTimeout(() => {
      photoStacks.slice(next, next + PHOTOS_PER_PAGE).forEach((stack) => {
        const img = new Image();
        img.src = photoSrc(stack.files[0]);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [page]);

  const goToPage = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`${getThemeClasses(theme)} min-h-screen`}>

      {/* Hero */}
      <div className="bg-neutral-950 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg text-neutral-800 opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="font-monospace text-neutral-500 text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-6xl font-jost font-extrabold text-white mb-4 tracking-tight">
            Photography
          </h1>
          <p className="font-monospace text-neutral-400 text-sm tracking-[0.2em] uppercase mb-3">
            Nikon D610 · AF-S NIKKOR 35mm f/1.8G · FX · 24.3MP
          </p>
          <p className="font-raleway text-neutral-500 text-sm max-w-sm mx-auto mb-6">
            Street, portrait, and whatever catches my eye — shot on 35mm prime.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-monospace">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot inline-block" />
            {totalPhotos} photos · {photoStacks.length} stacks · {totalPages} pages
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {pageStacks.map((stack, i) => (
            <PhotoTile
              key={stack.files[0]}
              filename={stack.files[0]}
              stackCount={stack.files.length}
              onClick={() => setLightbox({ s: page * PHOTOS_PER_PAGE + i, v: 0 })}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              className="w-9 h-9 rounded-lg flex items-center justify-center disabled:opacity-30
                disabled:cursor-not-allowed border border-neutral-600 text-neutral-400
                hover:border-amber-400/60 hover:text-amber-400 transition-colors duration-150"
            >
              <FaChevronLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-9 h-9 rounded-lg text-sm font-monospace font-semibold transition-colors duration-150
                  ${page === i
                    ? "bg-amber-500 text-black border border-amber-400"
                    : "border border-neutral-600 text-neutral-400 hover:border-amber-400/60 hover:text-amber-400"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center disabled:opacity-30
                disabled:cursor-not-allowed border border-neutral-600 text-neutral-400
                hover:border-amber-400/60 hover:text-amber-400 transition-colors duration-150"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}

        <p className="text-center font-monospace text-xs text-neutral-500 mt-3">
          Page {page + 1} of {totalPages} · {photoStacks.length} stacks · {totalPhotos} photos
        </p>

        <div className="mt-10 pt-6 border-t border-neutral-800 text-center">
          <p className="font-monospace text-[11px] text-neutral-600 max-w-xl mx-auto leading-relaxed mb-8">
            © {new Date().getFullYear()} Sean Finch. All images are subject to copyright and may not be reproduced,
            distributed, or used for any purpose without explicit written license from the author.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-monospace text-xs text-muted-foreground">
            {[
              ["Camera", "Nikon D610"],
              ["Lens", "AF-S NIKKOR 35mm 1:1.8G"],
              ["Format", "FX (Full Frame)"],
              ["Sensor", "24.3MP CMOS"],
              ["ISO Range", "100 – 25600"],
            ].map(([label, value]) => (
              <div key={label} className="text-center">
                <p className="uppercase tracking-wider text-[10px] mb-0.5">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightbox !== null && currentStack && currentFile && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/96 flex flex-col"
          onClick={() => setLightbox(null)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 shrink-0">
            <p className="font-monospace text-xs text-neutral-500">
              {lightbox.s + 1} / {photoStacks.length}
            </p>
            <p className="font-monospace text-[10px] text-neutral-600 truncate max-w-[40vw] text-center">
              {currentFile.replace(".webp", "")}
            </p>
            <button
              onClick={() => setLightbox(null)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center
                justify-center text-white transition-colors duration-150"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Main content row */}
          <div className="flex items-center flex-1 min-h-0 px-4 gap-3">

            {/* Prev stack */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lb) => lb && lb.s > 0 ? { s: lb.s - 1, v: 0 } : lb); }}
              disabled={lightbox.s === 0}
              className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center
                justify-center text-white transition-colors duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <FaChevronLeft size={15} />
            </button>

            {/* Image + EXIF */}
            <div
              className="flex items-center justify-center gap-4 flex-1 min-w-0 min-h-0 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <TransformWrapper
                ref={transformRef}
                minScale={1}
                maxScale={6}
                limitToBounds={false}
                doubleClick={{ mode: "zoomIn" }}
                wheel={{ step: 0.15 }}
                onTransform={(ref) => { zoomScaleRef.current = ref.state.scale; }}
              >
                <TransformComponent wrapperStyle={{ overflow: "visible" }}>
                  <img
                    key={currentFile}
                    src={photoSrc(currentFile)}
                    alt=""
                    className="max-h-[85vh] min-w-0 w-auto max-w-full object-contain rounded shadow-2xl select-none cursor-zoom-in"
                  />
                </TransformComponent>
              </TransformWrapper>

              {/* EXIF panel — desktop only */}
              <div className="hidden md:flex flex-col w-52 shrink-0 bg-neutral-900/80 border border-neutral-800
                rounded-xl p-4 gap-4 self-center">
                {cameraLabel && (
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-600 mb-1">Camera</p>
                    <p className="text-xs font-semibold text-neutral-300">{cameraLabel}</p>
                  </div>
                )}
                {lensLabel && (
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-600 mb-1">Lens</p>
                    <p className="text-xs font-semibold text-neutral-300 break-words leading-snug">{lensLabel}</p>
                  </div>
                )}

                <div className="border-t border-neutral-800 pt-3 grid grid-cols-2 gap-x-3 gap-y-3">
                  <ExifCell label="Aperture" value={aperture} />
                  <ExifCell label="Shutter" value={shutter} />
                  <ExifCell label="ISO" value={iso} />
                  <ExifCell label="Focal" value={focal} />
                </div>

                <div className="border-t border-neutral-800 pt-3">
                  <ExifCell label="Taken" value={dateTaken} />
                </div>

                {Object.keys(exif).length === 0 && (
                  <p className="text-[10px] font-monospace text-neutral-700 text-center leading-snug">
                    No EXIF data found in this file
                  </p>
                )}
              </div>
            </div>

            {/* Next stack */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lb) => lb && lb.s < photoStacks.length - 1 ? { s: lb.s + 1, v: 0 } : lb); }}
              disabled={lightbox.s === photoStacks.length - 1}
              className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center
                justify-center text-white transition-colors duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <FaChevronRight size={15} />
            </button>
          </div>

          {/* Version filmstrip — sits below image row, doesn't compete for height */}
          {currentStack.files.length > 1 && (
            <div
              className="shrink-0 flex items-center justify-center gap-2 py-2 border-t border-neutral-800/60"
              onClick={(e) => e.stopPropagation()}
            >
              {currentStack.files.map((f, vi) => (
                <button
                  key={f}
                  onClick={() => setLightbox((lb) => lb ? { ...lb, v: vi } : null)}
                  className={`relative w-16 h-11 rounded overflow-hidden transition-all duration-150 shrink-0
                    ${lightbox.v === vi ? "ring-2 ring-amber-400 opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <img src={photoSrc(f)} className="w-full h-full object-cover" alt="" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white
                    text-[8px] font-monospace text-center py-0.5 leading-none">
                    {versionLabel(f, vi, currentStack.files.length)}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Mobile EXIF strip */}
          <div className="md:hidden flex items-center justify-center gap-6 px-5 py-3 shrink-0
            border-t border-neutral-800 font-monospace">
            <ExifCell label="Aperture" value={aperture} />
            <ExifCell label="Shutter" value={shutter} />
            <ExifCell label="ISO" value={iso} />
            <ExifCell label="Focal" value={focal} />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Photography;
