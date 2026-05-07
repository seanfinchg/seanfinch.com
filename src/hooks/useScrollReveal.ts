import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Double RAF ensures the browser has painted the initial opacity:0 state
    // before the transition starts, so the animation always plays on mount.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add("is-visible");
      });
    });
  }, []);

  return ref;
}
