// Stagger for timeline cards: 70ms per card, capped at 350ms. Literal class names
// so Tailwind's scanner generates every one of them.
const REVEAL_DELAYS = [
  "delay-0",
  "delay-70",
  "delay-140",
  "delay-210",
  "delay-280",
  "delay-350",
] as const;

export function revealDelayClass(index: number): string {
  return REVEAL_DELAYS[Math.min(Math.max(index, 0), REVEAL_DELAYS.length - 1)] ?? "delay-350";
}
