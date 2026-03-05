/**
 * Utility functions for consistent styling across the application
 */

/**
 * Returns theme-specific background and text color classes
 * @param theme - The current theme ("light" or "dark")
 * @returns Tailwind CSS classes for background and text
 */
export const getThemeClasses = (theme: "light" | "dark"): string => {
  return theme === "light"
    ? "bg-light-mode text-ultra-dark-mode"
    : "bg-dark-mode text-light-mode";
};

/**
 * Returns theme-specific classes for ultra contrast (navbar, buttons)
 * @param theme - The current theme ("light" or "dark")
 * @returns Tailwind CSS classes for ultra contrast background and text
 */
export const getUltraThemeClasses = (theme: "light" | "dark"): string => {
  return theme === "light"
    ? "bg-ultra-light-mode text-ultra-dark-mode"
    : "bg-ultra-dark-mode text-light-mode";
};

/**
 * Returns theme-specific border classes
 * @param theme - The current theme ("light" or "dark")
 * @returns Tailwind CSS border color classes
 */
export const getThemeBorderClasses = (theme: "light" | "dark"): string => {
  return theme === "light" ? "border-dark-mode" : "border-light-mode";
};

/**
 * Returns theme-specific card classes (border, background, text)
 * @param theme - The current theme ("light" or "dark")
 * @returns Complete card styling classes
 */
export const getCardClasses = (theme: "light" | "dark"): string => {
  return theme === "light"
    ? "border-dark-mode text-dark-mode bg-light-mode"
    : "border-light-mode text-light-mode bg-dark-mode";
};

/**
 * Returns theme-specific featured card classes
 * @param theme - The current theme ("light" or "dark")
 * @returns Complete featured card styling classes
 */
export const getFeaturedCardClasses = (theme: "light" | "dark"): string => {
  return theme === "light"
    ? "border-blue-500 bg-blue-50 text-dark-mode"
    : "border-blue-400 bg-blue-900/20 text-light-mode";
};

/**
 * Returns theme-specific featured project card classes (green variant)
 * @param theme - The current theme ("light" or "dark")
 * @returns Complete featured project card styling classes
 */
export const getFeaturedProjectCardClasses = (
  theme: "light" | "dark",
): string => {
  return theme === "light"
    ? "border-green-700 bg-green-100 text-dark-mode"
    : "border-green-700 bg-green-950/40 text-light-mode";
};
