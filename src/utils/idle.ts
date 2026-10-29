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

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * False when the visitor asked to save data or is on a slow connection, so
 * speculative downloads (gallery thumbnails, page chunks) are skipped there.
 * `navigator.connection` is Chromium-only; elsewhere this is true.
 */
export const canPrefetch = (): boolean => {
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  return !["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "");
};
