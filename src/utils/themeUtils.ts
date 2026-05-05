import type { Theme } from "../contexts/themeContext";

export const getThemeClasses = (theme: Theme): string => {
  return theme === "light"
    ? "bg-gradient-to-br from-slate-200 via-blue-50 to-slate-100 text-ultra-dark-mode"
    : "bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-950 text-light-mode";
};

export const getUltraThemeClasses = (theme: Theme): string => {
  return theme === "light"
    ? "bg-ultra-light-mode text-ultra-dark-mode"
    : "bg-ultra-dark-mode text-light-mode";
};

export const getThemeBorderClasses = (theme: Theme): string => {
  return theme === "light" ? "border-dark-mode" : "border-light-mode";
};

export const getCardClasses = (theme: Theme): string => {
  return theme === "light"
    ? "border-dark-mode text-dark-mode bg-light-mode"
    : "border-light-mode text-light-mode bg-dark-mode";
};

export const getFeaturedCardClasses = (theme: Theme): string => {
  return theme === "light"
    ? "border-blue-500 bg-blue-50 text-dark-mode"
    : "border-blue-400 bg-blue-900/20 text-light-mode";
};

export const getFeaturedProjectCardClasses = (theme: Theme): string => {
  return theme === "light"
    ? "border-green-700 bg-green-100 text-dark-mode"
    : "border-green-700 bg-green-950/40 text-light-mode";
};

export const getActivityCardClasses = (
  theme: Theme,
  accent: "blue-gold" | "purple",
): string => {
  if (accent === "blue-gold") {
    return theme === "light"
      ? "border-blue-600 bg-blue-50 text-dark-mode"
      : "border-yellow-500 bg-blue-950/30 text-light-mode";
  }
  return theme === "light"
    ? "border-purple-600 bg-purple-50 text-dark-mode"
    : "border-purple-400 bg-purple-950/30 text-light-mode";
};
