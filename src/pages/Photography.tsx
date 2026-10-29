import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useTheme } from "../contexts/themeContext";
import { getThemeClasses } from "../utils/themeUtils";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCompress,
  FaExpand,
  FaInstagram,
  FaTimes,
} from "react-icons/fa";
import {
  featuredStack,
  photoAlt,
  photoMeta,
  photoStacks,
  PHOTO_TAGS,
  PHOTOS_PER_PAGE,
  photoSrc,
  photoThumb,
  photoLarge,
  photoTitle,
  type PhotoStack,
} from "../data/photos";
import exifDb from "../data/photo-exif.json";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { usePageMeta } from "../hooks/usePageMeta";

const isEditedFile = (f: string): boolean =>
  /[_-]edit(ed)?$/i.test(f.replace(/\.webp$/i, ""));

interface ExifData {
  Make?: string;
  Model?: string;
  LensModel?: string;
  FNumber?: number;
  ExposureTime?: number;
  ISO?: number;
  FocalLength?: number;
  DateTimeOriginal?: string;
}

const exifByFile = exifDb as Record<string, ExifData>;

/** The default-display file for a stack (edited version), never undefined. */
const coverFile = (stack: PhotoStack): string =>
  stack.files[stack.cover] ?? stack.files[0] ?? "";

const tagLabels = new Map(PHOTO_TAGS);
const stackTags = (stack: PhotoStack): string[] => photoMeta(stack.id).tags ?? [];

// Gear shown in the hero + footer. Per-photo lens comes from EXIF (see the
// lightbox EXIF panel); this list is the overall kit. Add lenses here as you
// acquire them — nothing else needs to change.
const CAMERA = "Nikon D610";
const LENSES = ["Nikkor 35mm f/1.8G", "Tamron 75–300mm"];
const INSTAGRAM_URL = "https://www.instagram.com/sfinch.jpg/";

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

const FOCUSABLE = "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";

const ExifCell: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] uppercase tracking-widest text-neutral-500">{label}</span>
    <span className="text-neutral-300 text-xs font-semibold break-words leading-snug">{value}</span>
  </div>
);

const IconButton: React.FC<{
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ label, onClick, disabled = false, className = "", children }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    disabled={disabled}
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center
      text-white transition-colors duration-150 disabled:opacity-20 disabled:cursor-not-allowed
      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${className}`}
  >
    {children}
  </button>
);

/**
 * Justified-rows tile: flex-grow and flex-basis are proportional to the aspect
 * ratio, so every tile in a row ends up the same height and each photo keeps
 * its true shape (portraits stay portrait). Pure CSS, no layout measuring.
 */
const PhotoTile: React.FC<{ stack: PhotoStack; onOpen: () => void }> = ({ stack, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const file = coverFile(stack);
  const ratio = stack.w / stack.h;
  const tags = stackTags(stack);
  return (
    <button
      type="button"
      data-photo-id={stack.id}
      onClick={onOpen}
      style={{ flexGrow: ratio, flexBasis: `calc(var(--row-h) * ${ratio})` }}
      className="group relative overflow-hidden rounded-md bg-neutral-800 cursor-zoom-in
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent"
    >
      <span className="block" style={{ paddingBottom: `${100 / ratio}%` }} aria-hidden="true" />
      {!loaded && <span className="absolute inset-0 animate-pulse bg-neutral-800" aria-hidden="true" />}
      <img
        src={photoThumb(file)}
        alt={photoAlt(stack.id)}
        loading="lazy"
        decoding="async"
        onLoad={() => { setLoaded(true); }}
        className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-500
          ease-out group-hover:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Caption — revealed on hover / keyboard focus */}
      <span
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 px-3 pb-2.5 pt-10 text-left
          bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 translate-y-1
          group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100
          group-focus-visible:translate-y-0 transition-all duration-200"
        aria-hidden="true"
      >
        <span className="font-jost font-semibold text-white text-sm leading-tight">
          {photoTitle(stack.id)}
        </span>
        {tags.length > 0 && (
          <span className="font-monospace text-[10px] uppercase tracking-wider text-neutral-300">
            {tags.map((t) => tagLabels.get(t) ?? t).join(" · ")}
          </span>
        )}
      </span>

      {isEditedFile(file) && stack.files.length > 1 && (
        <span className="absolute top-1.5 left-1.5 rounded px-1.5 py-0.5 text-[9px] font-monospace font-semibold
          uppercase tracking-wide leading-none bg-amber-500/85 text-black">
          Edited
        </span>
      )}

      {stack.files.length > 1 && (
        <span className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/70 shrink-0" aria-hidden="true">
            <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            <rect x="1.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75" />
            <rect x="0.5" y="0.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <span className="text-white text-[10px] font-monospace font-semibold leading-none">
            {stack.files.length}
            <span className="sr-only"> versions</span>
          </span>
        </span>
      )}
    </button>
  );
};

/** Per-photo UI choices, keyed by stack id so they reset when the photo changes. */
interface PerPhoto<T> { id: string; value: T }

const Photography: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  // Filter + open photo live in the URL so both are shareable and the back
  // button closes the lightbox.
  const tagParam = params.get("tag");
  const activeTag = tagParam && tagLabels.has(tagParam) ? tagParam : null;
  const photoId = params.get("photo");

  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_PAGE);
  const [version, setVersion] = useState<PerPhoto<number> | null>(null);
  const [compareFor, setCompareFor] = useState<string | null>(null);
  const [fullQualityFor, setFullQualityFor] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const zoomScaleRef = useRef(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  // True when this session pushed the ?photo= history entry, so closing can
  // pop it (Back) instead of stacking another entry.
  const pushedRef = useRef(false);
  const lastOpenId = useRef<string | null>(null);

  const filtered = activeTag
    ? photoStacks.filter((s) => stackTags(s).includes(activeTag))
    : photoStacks;
  const shown = filtered.slice(0, visibleCount);
  const totalPhotos = photoStacks.reduce((sum, s) => sum + s.files.length, 0);
  const tagCounts = PHOTO_TAGS.map(([id, label]) => ({
    id,
    label,
    count: photoStacks.filter((s) => stackTags(s).includes(id)).length,
  })).filter((t) => t.count > 0);

  // Lightbox navigation follows the active filter; a deep link to a photo
  // outside the filter falls back to the full set.
  const navList = photoId && filtered.some((s) => s.id === photoId) ? filtered : photoStacks;
  const lbIndex = photoId ? navList.findIndex((s) => s.id === photoId) : -1;
  const currentStack = lbIndex >= 0 ? (navList[lbIndex] ?? null) : null;
  const isOpen = currentStack !== null;
  const versionIdx =
    currentStack && version?.id === currentStack.id ? version.value : (currentStack?.cover ?? 0);
  const currentFile = currentStack ? (currentStack.files[versionIdx] ?? coverFile(currentStack)) : null;
  const compare = currentStack !== null && compareFor === currentStack.id;
  const fullQuality = currentStack !== null && fullQualityFor === currentStack.id;

  // A stack with exactly one original + one edited version supports before/after.
  const editFiles =
    currentStack?.files.length === 2 && currentStack.files.some(isEditedFile)
      ? currentStack.files
      : null;
  const editPair = editFiles
    ? {
        before: editFiles.find((f) => !isEditedFile(f)) ?? editFiles[0] ?? "",
        after: editFiles.find(isEditedFile) ?? editFiles[1] ?? "",
      }
    : null;

  // Edited exports may lack EXIF — fall back to the stack's original file,
  // since both versions describe the same shot.
  const exifFile =
    currentFile && currentFile in exifByFile
      ? currentFile
      : (currentStack?.files[0] ?? null);
  const exif: ExifData = exifFile ? (exifByFile[exifFile] ?? {}) : {};

  const make = exif.Make;
  const model = exif.Model;
  const cameraLabel =
    make && model
      ? `${make.replace("NIKON CORPORATION", "Nikon").replace("FUJIFILM", "Fujifilm")} ${model.replace("NIKON ", "")}`
      : "";
  const lensLabel = exif.LensModel ?? "";
  const aperture = exif.FNumber != null ? `f/${exif.FNumber}` : "—";
  const shutter = formatShutter(exif.ExposureTime);
  const iso = exif.ISO != null ? String(exif.ISO) : "—";
  const focal = exif.FocalLength != null ? `${exif.FocalLength}mm` : "—";
  const dateTaken = formatDateTime(exif.DateTimeOriginal);

  usePageMeta(
    currentStack ? `${photoTitle(currentStack.id)} · Photography` : "Photography",
    "Street scenes, city nights, and coastal landscapes by Sean Finch.",
  );

  const updateParams = (mutate: (p: URLSearchParams) => void, replace: boolean): void => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      mutate(next);
      return next;
    }, { replace, preventScrollReset: true });
  };

  const openPhoto = (id: string): void => {
    zoomScaleRef.current = 1;
    pushedRef.current = true;
    updateParams((p) => { p.set("photo", id); }, false);
  };

  const goTo = (idx: number): void => {
    const target = navList[idx];
    if (!target) return;
    zoomScaleRef.current = 1;
    updateParams((p) => { p.set("photo", target.id); }, true);
  };

  const close = (): void => {
    if (document.fullscreenElement) void document.exitFullscreen();
    if (pushedRef.current) {
      pushedRef.current = false;
      void navigate(-1);
    } else {
      updateParams((p) => { p.delete("photo"); }, true);
    }
  };

  const setTag = (tag: string | null): void => {
    setVisibleCount(PHOTOS_PER_PAGE);
    updateParams((p) => {
      if (tag) p.set("tag", tag);
      else p.delete("tag");
    }, true);
  };

  const toggleFullscreen = (): void => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void dialogRef.current?.requestFullscreen();
  };

  useEffect(() => {
    const onChange = (): void => { setIsFullscreen(document.fullscreenElement !== null); };
    document.addEventListener("fullscreenchange", onChange);
    return () => { document.removeEventListener("fullscreenchange", onChange); };
  }, []);

  // Lock page scroll while open; on close, return focus to the photo's tile.
  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
      lastOpenId.current = currentStack.id;
    } else if (lastOpenId.current) {
      document
        .querySelector<HTMLElement>(`[data-photo-id="${CSS.escape(lastOpenId.current)}"]`)
        ?.focus({ preventScroll: false });
      lastOpenId.current = null;
    }
    return () => { document.body.style.removeProperty("overflow"); };
  }, [isOpen, currentStack?.id]);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    if (isOpen) dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [isOpen]);

  // Keyboard: Esc closes, arrows navigate, F toggles fullscreen, Tab is trapped.
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent): void => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" && zoomScaleRef.current <= 1) goTo(lbIndex - 1);
      else if (e.key === "ArrowRight" && zoomScaleRef.current <= 1) goTo(lbIndex + 1);
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
      else if (e.key === "Tab" && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => { window.removeEventListener("keydown", handler); };
  });

  // Preload neighbouring photos in the lightbox.
  useEffect(() => {
    if (lbIndex < 0) return;
    [-1, 1, 2].forEach((offset) => {
      const stack = navList[lbIndex + offset];
      if (!stack) return;
      const img = new Image();
      img.src = photoLarge(coverFile(stack));
    });
    // Keyed on the active photo only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStack?.id]);

  const onTouchStart = (e: React.TouchEvent): void => {
    const t = e.touches[0];
    touchStart.current = e.touches.length === 1 && t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: React.TouchEvent): void => {
    const start = touchStart.current;
    const t = e.changedTouches[0];
    touchStart.current = null;
    if (!start || !t || zoomScaleRef.current > 1.01) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(lbIndex + (dx < 0 ? 1 : -1));
  };

  const chipClass = (active: boolean): string =>
    `h-8 px-3 rounded-full text-xs font-monospace font-semibold border transition-colors duration-150
      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
        active
          ? "bg-amber-500 text-black border-amber-400"
          : isLight
            ? "border-neutral-300 text-neutral-600 hover:border-amber-500 hover:text-amber-700"
            : "border-neutral-700 text-neutral-400 hover:border-amber-400/60 hover:text-amber-400"
      }`;

  const featured = featuredStack;
  const featuredFile = featured ? coverFile(featured) : null;
  const remaining = filtered.length - shown.length;

  return (
    <div className={`${getThemeClasses(theme)} min-h-screen`}>

      {/* Hero — full-bleed featured photograph */}
      <section className="relative isolate overflow-hidden bg-neutral-950 min-h-[460px] h-[72vh] max-h-[820px] flex items-end">
        {featured && featuredFile && (
          <img
            src={photoLarge(featuredFile)}
            alt=""
            fetchPriority="high"
            decoding="async"
            style={{ backgroundImage: `url("${photoThumb(featuredFile)}")` }}
            className="absolute inset-0 -z-10 w-full h-full object-cover bg-cover bg-center"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/10" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950/70 to-transparent" aria-hidden="true" />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <p className="font-monospace text-amber-400/90 text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-jost font-extrabold text-white mb-4 tracking-tight">
              Photography
            </h1>
            <p className="font-raleway text-neutral-200 text-base sm:text-lg leading-relaxed mb-5">
              Street scenes, city nights, and the occasional coastline — whatever catches my eye.
            </p>
            <p className="font-monospace text-neutral-400 text-[11px] sm:text-xs tracking-[0.18em] uppercase mb-6">
              {CAMERA} · {LENSES.join(" + ")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white text-black text-sm font-semibold
                  hover:bg-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Browse {photoStacks.length} photos
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm
                  text-white text-sm transition-colors hover:border-pink-300/70 hover:bg-pink-500/20
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                <FaInstagram size={15} aria-hidden="true" />
                More on Instagram
                <span className="text-neutral-300 font-monospace text-xs">@sfinch.jpg</span>
              </a>
            </div>
          </div>

          {featured && (
            <button
              type="button"
              onClick={() => { openPhoto(featured.id); }}
              className="self-start md:self-auto text-left group focus:outline-none focus-visible:ring-2
                focus-visible:ring-amber-400 rounded-md px-1"
            >
              <span className="block font-monospace text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">
                Featured
              </span>
              <span className="block font-jost font-semibold text-white text-lg group-hover:text-amber-300 transition-colors">
                {photoTitle(featured.id)} →
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 scroll-mt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div role="group" aria-label="Filter photos by subject" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={!activeTag} onClick={() => { setTag(null); }} className={chipClass(!activeTag)}>
              All <span className="opacity-60">{photoStacks.length}</span>
            </button>
            {tagCounts.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={activeTag === t.id}
                onClick={() => { setTag(activeTag === t.id ? null : t.id); }}
                className={chipClass(activeTag === t.id)}
              >
                {t.label} <span className="opacity-60">{t.count}</span>
              </button>
            ))}
          </div>
          <p className={`font-monospace text-xs ${isLight ? "text-neutral-500" : "text-neutral-500"}`} aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
            {activeTag ? ` · ${tagLabels.get(activeTag) ?? ""}` : ` · ${totalPhotos} files`}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-2 [--row-h:140px] sm:[--row-h:200px] lg:[--row-h:250px]
            after:content-[''] after:grow-[999]"
        >
          {shown.map((stack) => (
            <PhotoTile key={stack.id} stack={stack} onOpen={() => { openPhoto(stack.id); }} />
          ))}
        </div>

        {remaining > 0 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => { setVisibleCount((c) => c + PHOTOS_PER_PAGE); }}
              className={`${chipClass(false)} h-10 px-5`}
            >
              Show {Math.min(remaining, PHOTOS_PER_PAGE)} more
              <span className="opacity-60"> · {remaining} left</span>
            </button>
          </div>
        )}

        <div className={`mt-14 rounded-xl border px-6 py-8 text-center ${
          isLight ? "border-neutral-200 bg-white/60" : "border-neutral-800 bg-neutral-900/40"
        }`}>
          <p className="font-jost text-xl font-semibold mb-2">There&rsquo;s more on Instagram</p>
          <p className={`font-raleway text-sm mb-5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
            New shots usually land there first.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-pink-400/50 bg-pink-500/10
              text-pink-500 text-sm font-semibold transition-colors hover:bg-pink-500/20
              focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <FaInstagram size={15} aria-hidden="true" />
            @sfinch.jpg
          </a>
        </div>

        <div className={`mt-10 pt-6 border-t text-center ${isLight ? "border-neutral-200" : "border-neutral-800"}`}>
          <p className="font-monospace text-[11px] text-neutral-500 max-w-xl mx-auto leading-relaxed mb-8">
            © {new Date().getFullYear()} Sean Finch. All images are subject to copyright and may not be reproduced,
            distributed, or used for any purpose without explicit written license from the author.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-monospace text-xs text-muted-foreground">
            {[
              ["Camera", CAMERA],
              ["Lenses", LENSES.join(" · ")],
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
      </section>

      {isOpen && currentFile && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${photoTitle(currentStack.id)} — photo ${lbIndex + 1} of ${navList.length}`}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-3 shrink-0">
            <p className="font-monospace text-xs text-neutral-400 w-16 shrink-0">
              {lbIndex + 1} / {navList.length}
            </p>
            <div className="flex items-center gap-2 min-w-0">
              {currentStack.files.length > 1 && (
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-monospace font-semibold
                    uppercase tracking-wide leading-none ${
                      isEditedFile(currentFile) ? "bg-amber-500/85 text-black" : "bg-white/15 text-neutral-200"
                    }`}
                >
                  {isEditedFile(currentFile) ? "Edited" : "Original"}
                </span>
              )}
              <h2 className="font-jost text-sm sm:text-base font-semibold text-white truncate">
                {photoTitle(currentStack.id)}
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {!compare && (
                <button
                  type="button"
                  aria-pressed={fullQuality}
                  onClick={(e) => { e.stopPropagation(); setFullQualityFor(fullQuality ? null : currentStack.id); }}
                  title="Load the full-resolution original (larger download)"
                  className={`h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-monospace
                    font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-amber-400 ${
                      fullQuality ? "bg-amber-500 text-black" : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                >
                  <span className="sm:hidden">HQ</span>
                  <span className="hidden sm:inline">Full quality</span>
                  {fullQuality && " ✓"}
                </button>
              )}
              {editPair && (
                <button
                  type="button"
                  aria-pressed={compare}
                  onClick={(e) => { e.stopPropagation(); setCompareFor(compare ? null : currentStack.id); }}
                  className={`h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-monospace
                    font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-amber-400 ${
                      compare ? "bg-amber-500 text-black" : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                >
                  ⇄ {compare ? "Exit compare" : "Compare"}
                </button>
              )}
              <IconButton
                label={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
                onClick={toggleFullscreen}
                className="w-9 h-9 hidden sm:flex"
              >
                {isFullscreen ? <FaCompress size={13} /> : <FaExpand size={13} />}
              </IconButton>
              <span data-autofocus tabIndex={-1} className="sr-only" />
              <IconButton label="Close (Esc)" onClick={close} className="w-9 h-9">
                <FaTimes size={14} />
              </IconButton>
            </div>
          </div>

          {/* Main content row */}
          <div className="flex items-center flex-1 min-h-0 px-2 sm:px-4 gap-3">
            <IconButton
              label="Previous photo"
              onClick={() => { goTo(lbIndex - 1); }}
              disabled={lbIndex === 0}
              className="w-10 h-10 hidden sm:flex"
            >
              <FaChevronLeft size={15} />
            </IconButton>

            {/* Image + EXIF */}
            <div
              className="flex items-center justify-center gap-4 flex-1 min-w-0 min-h-0 h-full overflow-hidden"
              onClick={(e) => { e.stopPropagation(); }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {compare && editPair ? (
                <BeforeAfterSlider
                  beforeSrc={photoLarge(editPair.before)}
                  afterSrc={photoLarge(editPair.after)}
                />
              ) : (
                <TransformWrapper
                  key={currentFile}
                  minScale={1}
                  maxScale={8}
                  centerOnInit
                  centerZoomedOut
                  doubleClick={{ mode: "toggle", step: 1.6 }}
                  wheel={{ step: 0.2 }}
                  pinch={{ step: 5 }}
                  panning={{ velocityDisabled: true }}
                  onInit={() => { zoomScaleRef.current = 1; }}
                  onTransform={(ref) => { zoomScaleRef.current = ref.state.scale; }}
                >
                  <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={fullQuality ? photoSrc(currentFile) : photoLarge(currentFile)}
                      alt={photoAlt(currentStack.id)}
                      // Cover dimensions reserve the box so the blurred thumb
                      // placeholder shows while the large image streams in.
                      {...(currentFile === coverFile(currentStack)
                        ? { width: currentStack.w, height: currentStack.h }
                        : {})}
                      style={{ backgroundImage: `url("${photoThumb(currentFile)}")` }}
                      className="max-h-[calc(100dvh-9rem)] h-auto min-w-0 w-auto max-w-full object-contain rounded
                        shadow-2xl select-none cursor-zoom-in bg-cover bg-center"
                    />
                  </TransformComponent>
                </TransformWrapper>
              )}

              {/* Details panel — desktop only */}
              <div className="hidden md:flex flex-col w-56 shrink-0 bg-neutral-900/80 border border-neutral-800
                rounded-xl p-4 gap-4 self-center">
                {(photoMeta(currentStack.id).tags ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {stackTags(currentStack).map((t) => (
                      <span key={t} className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px]
                        font-monospace uppercase tracking-wider text-neutral-400">
                        {tagLabels.get(t) ?? t}
                      </span>
                    ))}
                  </div>
                )}
                {cameraLabel && (
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">Camera</p>
                    <p className="text-xs font-semibold text-neutral-300">{cameraLabel}</p>
                  </div>
                )}
                {lensLabel && (
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">Lens</p>
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
                  <p className="text-[10px] font-monospace text-neutral-600 text-center leading-snug">
                    No EXIF data found in this file
                  </p>
                )}
                <p className="text-[10px] font-monospace text-neutral-600 leading-snug">
                  ← → to browse · F fullscreen · double-click to zoom
                </p>
              </div>
            </div>

            <IconButton
              label="Next photo"
              onClick={() => { goTo(lbIndex + 1); }}
              disabled={lbIndex === navList.length - 1}
              className="w-10 h-10 hidden sm:flex"
            >
              <FaChevronRight size={15} />
            </IconButton>
          </div>

          {/* Version filmstrip — sits below image row, doesn't compete for height */}
          {!compare && currentStack.files.length > 1 && (
            <div
              className="shrink-0 flex items-center justify-center gap-2 py-2 border-t border-neutral-800/60"
              onClick={(e) => { e.stopPropagation(); }}
            >
              {currentStack.files.map((f, vi) => (
                <button
                  key={f}
                  type="button"
                  aria-label={`Show version: ${versionLabel(f, vi, currentStack.files.length)}`}
                  aria-pressed={versionIdx === vi}
                  onClick={() => { setVersion({ id: currentStack.id, value: vi }); }}
                  className={`relative w-16 h-11 rounded overflow-hidden transition-all duration-150 shrink-0
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                    ${versionIdx === vi ? "ring-2 ring-amber-400 opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <img src={photoThumb(f)} className="w-full h-full object-cover" alt="" />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white
                    text-[8px] font-monospace text-center py-0.5 leading-none">
                    {versionLabel(f, vi, currentStack.files.length)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Mobile bottom bar: prev/next + EXIF */}
          <div
            className="md:hidden flex items-center justify-between gap-3 px-3 py-3 shrink-0 border-t border-neutral-800 font-monospace"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <IconButton
              label="Previous photo"
              onClick={() => { goTo(lbIndex - 1); }}
              disabled={lbIndex === 0}
              className="w-10 h-10 sm:hidden"
            >
              <FaChevronLeft size={14} />
            </IconButton>
            <div className="flex items-center justify-center gap-5 flex-1">
              <ExifCell label="Aperture" value={aperture} />
              <ExifCell label="Shutter" value={shutter} />
              <ExifCell label="ISO" value={iso} />
              <ExifCell label="Focal" value={focal} />
            </div>
            <IconButton
              label="Next photo"
              onClick={() => { goTo(lbIndex + 1); }}
              disabled={lbIndex === navList.length - 1}
              className="w-10 h-10 sm:hidden"
            >
              <FaChevronRight size={14} />
            </IconButton>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Photography;
