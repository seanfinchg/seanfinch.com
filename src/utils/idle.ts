/**
 * Run `fn` when the browser is idle (or after `timeout` ms at the latest).
 * Falls back to a plain timeout where requestIdleCallback is missing (Safari).
 * Returns a cancel function.
 */
export const whenIdle = (fn: () => void, timeout = 3000): (() => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout });
    return () => { window.cancelIdleCallback(id); };
  }
  const id = window.setTimeout(fn, timeout);
  return () => { window.clearTimeout(id); };
};
