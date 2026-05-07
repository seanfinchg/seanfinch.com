import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/themeContext";
import { useLocation } from "react-router-dom";
import { getThemeClasses, getThemeBgClasses } from "../utils/themeUtils";
import { FaMoon, FaSun } from "react-icons/fa";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const hideFooter = location.pathname === "/projects/homelab";
  const disableGlow = location.pathname.startsWith("/photography");
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const themeClass = `${getThemeBgClasses(theme)} ${getThemeClasses(theme)}`;
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    if (disableGlow) return;
    const onMouse = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, [disableGlow]);

  return (
    <div
      className={`flex flex-col min-h-screen justify-between ${themeClass} relative overflow-x-hidden`}
    >
      {/* Cursor-tracking glow — large, behind content */}
      <div
        ref={cursorGlowRef}
        className="fixed pointer-events-none z-0"
        hidden={disableGlow}
        style={{
          width: "820px",
          height: "820px",
          borderRadius: "50%",
          left: "-410px",
          top: "-410px",
          filter: "blur(90px)",
          opacity: theme === "light" ? 0.38 : 0.28,
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(147,197,253,0.95) 0%, rgba(167,139,250,0.5) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(79,70,229,0.9) 0%, rgba(14,165,233,0.55) 45%, transparent 70%)",
          transition:
            "transform 0.45s cubic-bezier(0.17, 0.67, 0.35, 0.99), opacity 0.5s ease, background 0.5s ease",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Secondary spotlight — small, sits above content for always-visible cursor presence */}
      <div
        ref={ambientGlowRef}
        className="fixed pointer-events-none z-[15]"
        hidden={disableGlow}
        style={{
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          left: "-160px",
          top: "-160px",
          filter: "blur(50px)",
          opacity: theme === "light" ? 0.11 : 0.09,
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(99,179,237,1) 0%, rgba(139,92,246,0.5) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(129,140,248,1) 0%, rgba(56,189,248,0.5) 50%, transparent 70%)",
          transition:
            "transform 0.2s ease-out, opacity 0.5s ease, background 0.5s ease",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* CRT scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[40]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.055) 2px, rgba(0,0,0,0.055) 4px)",
          opacity: theme === "light" ? 0.45 : 0.65,
        }}
        aria-hidden="true"
      />

      <Navbar />
      <div key={location.pathname} className="animate-page-in relative z-10">
        {children}
      </div>
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
