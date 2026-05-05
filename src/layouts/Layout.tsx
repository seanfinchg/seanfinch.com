import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/themeContext";
import { useLocation } from "react-router-dom";
import { getThemeClasses } from "../utils/themeUtils";
import { FaMoon, FaSun } from "react-icons/fa";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const hideFooter = location.pathname === "/projects/homelab";

  const themeClass = getThemeClasses(theme);
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={`flex flex-col min-h-screen justify-between ${themeClass}`}>
      <Navbar />
      <div key={location.pathname} className="animate-page-in">{children}</div>
      {!hideFooter && <Footer />}

      {/* Floating theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center
          bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md
          border border-slate-300/70 dark:border-white/15
          shadow-lg shadow-black/10 dark:shadow-black/40
          hover:scale-110 transition-all duration-200
          text-neutral-700 dark:text-neutral-200"
      >
        {theme === "light" ? <FaMoon size={15} /> : <FaSun size={15} />}
      </button>
    </div>
  );
};

export default Layout;
