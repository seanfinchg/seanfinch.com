import "../index.css";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

  const isCurrentPage = (path: string) => location.pathname === path;

  const renderDesktopMenu = () => (
    <div className="fixed top-0 w-full text-center text-white flex justify-between px-4 bg-blue-500 h-16 items-center">
      <Link to="/" className={`hover:font-bold w-1/4 text-center ${isCurrentPage('/') ? 'font-bold' : ''}`}>Home</Link>
      <Link to="/projects" className={`hover:font-bold w-1/4 text-center ${isCurrentPage('/projects') ? 'font-bold' : ''}`}>Projects</Link>
      <Link to="/contact" className={`hover:font-bold w-1/4 text-center ${isCurrentPage('/contact') ? 'font-bold' : ''}`}>Contact</Link>
      <Link to="/about" className={`hover:font-bold w-1/4 text-center ${isCurrentPage('/about') ? 'font-bold' : ''}`}>About</Link>
    </div>
  );

  const renderMobileMenu = () => (
    // Your hamburger menu implementation here
  );

  return isMobile ? renderMobileMenu() : renderDesktopMenu();
};

export default Navbar;