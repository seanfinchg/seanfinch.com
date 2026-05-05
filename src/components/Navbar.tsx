import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

interface NavLink {
  to: string;
  text: string;
}

const links: NavLink[] = [
  { to: "/", text: "Home" },
  { to: "/projects", text: "Projects" },
  { to: "/experience", text: "Experience" },
  { to: "/photography", text: "Photography" },
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
            className={`font-monospace py-4 px-3 text-3xl md:text-sm tracking-wide transition-all duration-200 relative
              after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-sky-400
              after:transition-all after:duration-200
              ${
                isActive
                  ? "font-bold after:w-full text-sky-500 dark:text-sky-400"
                  : "font-normal after:w-0 hover:after:w-full opacity-70 hover:opacity-100"
              } text-center`}
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

  const getStyleForMobileNavbar = (): string => {
    return isMobile
      ? `fixed top-20 left-0 z-50 w-screen rounded-br-lg rounded-bl-lg
          bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md
          border-b border-slate-200/60 dark:border-white/10
          flex flex-col transition-opacity
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`
      : "w-full flex justify-around items-center";
  };

  return (
    <div
      className="w-full text-center flex justify-between px-4 h-20 md:h-12 items-center sticky top-0 z-50
      bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md
      border-b border-slate-200/70 dark:border-white/[0.07]"
    >
      <div className="flex items-center w-full">
        <button
          className="text-5xl md:invisible opacity-60 hover:opacity-90 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className={getStyleForMobileNavbar()}>
          {(isOpen || !isMobile) && <Links onClick={() => setIsOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
