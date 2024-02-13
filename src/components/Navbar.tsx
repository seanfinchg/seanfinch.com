import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../contexts/themeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const links = [
  { to: "/", text: "Home" },
  { to: "/projects", text: "Projects" },
  { to: "/contact", text: "Contact" },
  { to: "/about", text: "About" },
];

const Links = ({ onClick }: { onClick?: () => void }) => {
  const location = useLocation();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`py-2 px-4 hover:font-bold ${location.pathname === link.to ? "font-bold" : ""} lg:w-24 text-center`}
          onClick={onClick}
        >
          {link.text}
        </Link>
      ))}
    </>
  );
};

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`w-full text-center flex justify-between px-4 h-16 items-center ${
        theme === "light" ? "bg-ultra-light-mode text-ultra-dark-mode" : "bg-ultra-dark-mode text-light-mode"
      }`}
    >
      {isMobile ? (
        <>
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          {isOpen && (
            <div
              className={`fixed top-16 left-0 w-64 rounded-br-lg rounded-bl-lg ${
                theme === "light" ? "bg-ultra-light-mode text-ultra-dark-mode" : "bg-ultra-dark-mode text-light-mode"
              }`}
            >
              <Links onClick={() => setIsOpen(false)} />
              <div className="flex justify-center py-2">
                <button onClick={toggleTheme}>
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex justify-around items-center">
          <Links />
          <button onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
