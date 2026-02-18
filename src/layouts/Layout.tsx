import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/themeContext";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const hideFooter = location.pathname === "/projects/homelab";

  const themeClass =
    theme === "light"
      ? "bg-light-mode text-dark-mode"
      : "bg-dark-mode text-light-mode";

  return (
    <div className={`flex flex-col min-h-screen justify-between ${themeClass}`}>
      <Navbar />
      <div>{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
