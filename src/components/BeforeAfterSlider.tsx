import { useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Draggable before/after comparison. The "after" image defines the box size;
 * the "before" image is layered on top and revealed from the left via clip-path
 * so both versions render at identical dimensions. Drag anywhere on the image.
 */
const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeSrc,
  afterSrc,
  beforeLabel = "Original",
  afterLabel = "Edited",
}) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number): void => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  const onPointerDown = (e: React.PointerEvent): void => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent): void => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stopDrag = (): void => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      className="relative inline-block select-none touch-none cursor-ew-resize rounded shadow-2xl overflow-hidden"
    >
      {/* After image defines the rendered box */}
      <img
        src={afterSrc}
        alt={afterLabel}
        draggable={false}
        className="block max-h-[80vh] max-w-full w-auto"
      />
      {/* Before image, revealed from the left edge to `pos`% */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.6)] pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-black text-xs font-bold">
          ‹›
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-monospace uppercase tracking-wider pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-monospace uppercase tracking-wider pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
};

export default BeforeAfterSlider;
