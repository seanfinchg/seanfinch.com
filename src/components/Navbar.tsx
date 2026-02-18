import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../contexts/themeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const links = [
  { to: "/", text: "Home" },
  { to: "/projects", text: "Projects" },
  { to: "/experience", text: "Experience" },
  { to: "/music", text: "Music Portfolio" },
  { to: "/contact", text: "Contact" },
  { to: "/about", text: "About" },
];

const Links: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const location = useLocation();
  const isHomelabPage = location.pathname === "/projects/homelab";

  return (
    <>
      {links.map((link) => {
        const isActive =
          location.pathname === link.to ||
          (isHomelabPage && link.to === "/projects");
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`font-jost py-4 px-4 hover:font-extrabold text-3xl md:text-base transition-all ${isActive ? "font-extrabold underline decoration-2 underline-offset-4" : ""} text-center`}
            onClick={onClick}
          >
            {link.text}
          </Link>
        );
      })}
    </>
  );
};

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const getThemeCSS = () => {
    return theme === "light"
      ? "bg-ultra-light-mode text-ultra-dark-mode"
      : "bg-ultra-dark-mode text-light-mode";
  };

  const getStyleForMobileNavbar = (): string => {
    return isMobile
      ? `fixed top-20 left-0 z-50 w-screen rounded-br-lg rounded-bl-lg ${getThemeCSS()} flex flex-col 
        transition-opacity transition-height ${
          isOpen ? "opacity-100 h-auto" : "opacity-0 h-0"
        }`
      : "w-full flex justify-around items-center";
  };

  return (
    <div
      className={`w-full text-center flex justify-between px-4 h-20 md:h-12 items-center ${getThemeCSS()}`}
    >
      <div className="flex items-center w-full">
        <button
          className="text-5xl md:invisible"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className={getStyleForMobileNavbar()}>
          {(isOpen || !isMobile) && <Links onClick={() => setIsOpen(false)} />}
          {!isMobile && (
            <button onClick={toggleTheme} className="text-base">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          )}
        </div>
      </div>
      {isMobile && (
        <button onClick={toggleTheme} className="text-4xl">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      )}
    </div>
  );
};

export default Navbar;
