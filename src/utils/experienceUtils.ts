import { experiences, type ExperienceProps } from "../data/experiences";

const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/** Parse a "Month YYYY" string (e.g. "June 2026") to a Date on the 1st of that month. */
const parseMonthYear = (s: string): Date => {
  const parts = s.trim().split(/\s+/);
  const monthToken = parts[0]?.toLowerCase().slice(0, 3) ?? "";
  const month = MONTH_MAP[monthToken] ?? 0;
  const year = parts[1] ? parseInt(parts[1], 10) : NaN;
  return new Date(year, month, 1);
};

/** Split a date range on any dash variant: hyphen, en-dash, or em-dash. */
const splitRange = (dateRange: string): string[] =>
  dateRange.split(/\s*[–—-]\s*/);

/**
 * Parsed start/end for a role's date range. `end` is the last day of the end
 * month (or `now` for an ongoing "Present" role). Returns null if unparseable.
 */
const parseRange = (
  dateRange: string,
  now: Date,
): { start: Date; end: Date } | null => {
  const parts = splitRange(dateRange);
  const startStr = parts[0];
  const endStr = parts[1];
  if (startStr === undefined || endStr === undefined) return null;
  const start = parseMonthYear(startStr);
  const isPresent = endStr.trim().toLowerCase() === "present";
  const endBase = isPresent ? now : parseMonthYear(endStr);
  const end = new Date(endBase.getFullYear(), endBase.getMonth() + 1, 0);
  return { start, end };
};

/** True if `now` (defaults to the current date) falls within the role's range. */
export const isCurrentlyActive = (
  dateRange: string,
  now: Date = new Date(),
): boolean => {
  const parsed = parseRange(dateRange, now);
  if (!parsed) return false;
  return now >= parsed.start && now <= parsed.end;
};

/**
 * The single role to surface as "current". Prefers an active role (latest
 * start wins when ranges overlap); if none are active, falls back to the most
 * recently started role so the banner never goes blank.
 */
export const getCurrentExperience = (
  now: Date = new Date(),
): ExperienceProps | null => {
  if (experiences.length === 0) return null;

  const withStart = experiences
    .map((exp) => ({ exp, parsed: parseRange(exp.dateRange, now) }))
    .filter((e): e is { exp: ExperienceProps; parsed: { start: Date; end: Date } } => e.parsed !== null);

  const active = withStart.filter(
    ({ parsed }) => now >= parsed.start && now <= parsed.end,
  );
  const pool = active.length > 0 ? active : withStart;
  if (pool.length === 0) return null;

  pool.sort((a, b) => b.parsed.start.getTime() - a.parsed.start.getTime());
  return pool[0]?.exp ?? null;
};

/** Whether the current role (by date) is an active/ongoing one. */
export const hasActiveExperience = (now: Date = new Date()): boolean =>
  experiences.some((exp) => isCurrentlyActive(exp.dateRange, now));
