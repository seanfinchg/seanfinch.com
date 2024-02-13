import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
  className?: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const [isOpen, setIsOpen] = useState(false);

  const isCurrentPage = (path: string) => location.pathname === path;

  const NavLink = ({
    to,
    children,
    mobile = false,
    className = "",
  }: NavLinkProps) => (
    <Link
      to={to}
      className={`${className} ${mobile ? "block py-2 px-4" : "w-1/4 text-center"} hover:font-bold ${isCurrentPage(to) ? "font-bold" : ""}`}
      onClick={mobile ? () => setIsOpen(false) : undefined}
    >
      {children}
    </Link>
  );

  const renderMenu = () => {
    const links = [
      { to: "/", text: "Home" },
      { to: "/projects", text: "Projects" },
      { to: "/contact", text: "Contact" },
      { to: "/about", text: "About" },
    ];

    return (
      <div className="fixed top-0 w-full text-center text-white flex justify-between px-4 bg-blue-500 h-16 items-center">
        {isMobile ? (
          <>
            <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
            {isOpen && (
              <div className="fixed top-16 left-0 w-64 bg-blue-500 rounded-br-lg rounded-bl-lg">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    mobile
                    className="block py-2 px-4"
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
            )}
          </>
        ) : (
          links.map((link) => (
            <NavLink key={link.to} to={link.to} className="w-1/4 text-center">
              {link.text}
            </NavLink>
          ))
        )}
      </div>
    );
  };

  return renderMenu();
};

export default Navbar;
