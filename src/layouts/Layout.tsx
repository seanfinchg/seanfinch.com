import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/themeContext";
import { useLocation } from "react-router-dom";
import { getThemeClasses } from "../utils/themeUtils";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const hideFooter = location.pathname === "/projects/homelab";

  const themeClass = getThemeClasses(theme);

  return (
    <div className={`flex flex-col min-h-screen justify-between ${themeClass}`}>
      <Navbar />
      <div>{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
