import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { getThemeClasses } from "../utils/themeUtils";
import { FaCamera, FaExpand } from "react-icons/fa";

type Frame = { id: number; span: 1 | 2 };

const frames: Frame[] = [
  { id: 1, span: 2 },
  { id: 2, span: 1 },
  { id: 3, span: 1 },
  { id: 4, span: 2 },
  { id: 5, span: 2 },
  { id: 6, span: 1 },
  { id: 7, span: 1 },
  { id: 8, span: 1 },
  { id: 9, span: 1 },
];

const GalleryFrame = ({ id, span }: Frame) => {
  const num = String(id).padStart(2, "0");
  const isWide = span === 2;

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800
        cursor-default transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-amber-950/40 hover:border-neutral-600
        ${isWide ? "col-span-2 aspect-video" : "col-span-1 aspect-[4/3]"}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
        <span className="absolute top-3 left-3 text-[10px] font-monospace text-neutral-600 tracking-widest select-none">
          {num}
        </span>
        <FaCamera
          size={isWide ? 30 : 22}
          className="text-neutral-700 group-hover:text-neutral-500 transition-colors duration-300"
        />
        <p className="text-[10px] font-monospace text-neutral-700 tracking-[0.2em] uppercase
          group-hover:text-neutral-600 transition-colors duration-300">
          35mm · f/1.8
        </p>
      </div>

      {/* Hover overlay — warm darkroom amber */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2
        bg-gradient-to-t from-amber-950/95 via-amber-900/40 to-neutral-900/10
        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FaExpand size={16} className="text-amber-300/60" />
        <p className="text-amber-300/70 text-xs font-monospace tracking-widest">
          Coming soon
        </p>
      </div>
    </div>
  );
};

const Photography: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Photography - Sean Finch • SoCal";
  }, []);

  return (
    <div className={`${getThemeClasses(theme)} min-h-screen`}>

      {/* Hero — always dark regardless of page theme, for the gallery aesthetic */}
      <div className="bg-neutral-950 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg text-neutral-800 opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="font-monospace text-neutral-500 text-xs tracking-[0.4em] uppercase mb-4">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-6xl font-jost font-extrabold text-white mb-4 tracking-tight">
            Photography
          </h1>
          <p className="font-monospace text-neutral-400 text-sm tracking-[0.2em] uppercase mb-3">
            Nikon D610 · AF-S NIKKOR 35mm f/1.8G · FX · 24.3MP
          </p>
          <p className="font-raleway text-neutral-500 text-sm max-w-sm mx-auto mb-6">
            Street, portrait, and whatever catches my eye — shot on 35mm prime.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
            bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-monospace">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot inline-block" />
            Gallery loading — photos coming soon
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {frames.map((frame) => (
            <GalleryFrame key={frame.id} {...frame} />
          ))}
        </div>

        {/* Camera specs footer */}
        <div className="mt-10 pt-6 border-t border-neutral-800 dark:border-neutral-700">
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

    </div>
  );
};

export default Photography;
