import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/themeContext";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === "light"
          ? "bg-light-mode text-dark-mode min-h-screen flex flex-col"
          : "bg-dark-mode text-light-mode min-h-screen flex flex-col"
      }
    >
      <Navbar />
      <div className="flex-1 overflow-y-auto justify-center items-center">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
